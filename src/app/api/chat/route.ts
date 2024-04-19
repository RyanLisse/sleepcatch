import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();
    const articles = body.articles;

    if (!Array.isArray(articles)) {
        return new Response("Invalid request: articles must be an array", { status: 400 });
    }

    const prompt = `Summarize the following news articles in 3-4 sentences: ${articles.map((article) => article.title).join('\n')}`;
       const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        stream: true,
        messages: [
            {
                role: 'user',
                content: `Given the following news article titles, summarize them in 3-4 sentences. Only respond with the summary text.
${prompt}
Output:
`,
            },
        ],
        max_tokens: 300,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });

    console.log("OpenAI Response:", response);
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
