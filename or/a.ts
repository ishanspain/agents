import { OpenRouter } from '@openrouter/sdk';
import { callModel, tool } from '@openrouter/agent';
import { weatherTool } from './tools';

process.loadEnvFile('./.env');
const OR_API_KEY = process.env.OR_API_KEY;

if (!OR_API_KEY) throw new Error('OR_API_KEY is not set');

const client = new OpenRouter({ apiKey: OR_API_KEY });


const result = callModel(client, {
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    input: 'What is the waether in gurugram?',
    tools: [weatherTool] as const,
});

// Get the final text response (tools are auto-executed)
const text = await result.getText();
console.log(text);