import { OpenRouter } from '@openrouter/sdk';
import { callModel, tool } from '@openrouter/agent';
import { z } from 'zod';

process.loadEnvFile('./.env');
const OR_API_KEY = process.env.OR_API_KEY;

if (!OR_API_KEY) throw new Error('OPENROUTER_API_KEY is not set');

const client = new OpenRouter({ apiKey: OR_API_KEY });

const weatherTool = tool({
  name: 'get_weather',
  description: 'Get the current weather for a location',
  inputSchema: z.object({ location: z.string() }),
  execute: async ({ location }) => ({
    temperature: 72,
    condition: 'sunny',
    location,
  }),
});

const result = callModel(client, {
  model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
  input: 'What is the weather in San Francisco?',
  tools: [weatherTool] as const,
});

// Get the final text response (tools are auto-executed)
const text = await result.getText();
console.log(text);