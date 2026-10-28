import { tool } from '@openrouter/agent';
import { z } from 'zod';

export const weatherTool = tool({
    name: 'get_weather',
    description: 'Get the current weather for a location',
    inputSchema: z.object({ location: z.string().describe('City name in lowercase') }),
    execute: async ({ location }) => {
        console.log("location", location)

        if (location === "delhi") {
            return {
                temperature: 9,
                condition: 'winter',
                location,
            }
        }

        if (location.toLocaleLowerCase() === "america") {
            return {
                temperature: 72,
                condition: 'sunny',
                location,
            }
        }
        return { message: "not avaliable" };
    },
});