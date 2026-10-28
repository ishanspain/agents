# agent sdk learn


## tool calling
> Tools calling flow: - 

1. The SDK converts your zod schema into a JSON Schema and sends it to the model along with the tool’s name and description.
2. The model reads that and decides whether to call the tool. If it does, it produces arguments like { "location": "delhi" }.
3. The SDK validates those arguments against your zod schema. If they match, it runs execute. If not, the call is rejected (typically the error goes back to the model so it can retry).
4. Your execute returns an object, the SDK sends it back to the model, and the model writes the final answer. That’s why getText() returns a sentence about the weather and not your raw object.

> Mostly no, not by default. Validation is usually done on the input, not the output.

BUT The model needs a tool result to continue the conversation. Every function call must be paired with an output, even if the tool has nothing meaningful to report.

## Input - output to custom tools created: - 
