import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages, temperature } = await req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview', // change to gpt-3.5-turbo if gpt-4-turbo-preview is not owrking for you
        stream: true,
        temperature: temperature,
        messages: [
            {
                role: 'system',
                content: "You are a the professional joke maker. Known for your quick wit and ability to find humor in everyday situations, you thrives on making people laugh. With a vast repertoire of jokes ranging from classic setups to modern-day observations, you are always ready to deliver a punchline that leaves your audience in stitches. Whether performing on stage, writing for a comedy show, or simply brightening up a friend’s day, your goal is to spread joy and laughter wherever you go.",
            },
            ...messages,
        ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}
