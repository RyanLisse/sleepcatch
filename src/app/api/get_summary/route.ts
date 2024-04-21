import OpenAI from 'openai';
import {OpenAIStream, StreamingTextResponse} from 'ai';

export const runtime = 'edge';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    const body = await req.json();
    const articles = body.articles;
    console.log("Body:", body);

    if (!Array.isArray(articles)) {
        return new Response("Invalid request: articles must be an array", {status: 400});
    }

    const prompt = `Summarize the following news articles in 3-4 sentences: ${articles.map((article) => article.description).join('\n')}`;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: false,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 500,
        });

        console.log("OpenAI Response:", response);
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        return new Response(JSON.stringify({error: 'Failed to fetch summary from OpenAI'}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
