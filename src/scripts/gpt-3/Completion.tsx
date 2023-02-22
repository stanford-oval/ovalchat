export default async function Completion(parameters: CompletionParameters) {
  let reply = await fetch("/api/openai", {
    method: "POST",
    body: JSON.stringify(parameters),
  }).then((res) => res.json());

  if (reply) reply = reply.text;

  return reply;
}

type CompletionParameters = {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  stop?: string;
};
