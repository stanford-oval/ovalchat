import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import rateLimit from "../../scripts/utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("In api/openai handler...");

  try {
    await limiter.check(res, 20, "CACHE_TOKEN"); // 20 requests per minute
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,

    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion(req.body);

    let text = "";
    let logprobs = {};

    if (response && response.data && response.data.choices) {
      if (response.data.choices[0].text) text = response.data.choices[0].text;

      if (response.data.choices[0].logprobs)
        logprobs = response.data.choices[0].logprobs;
    }

    res.status(200).json({ text: text, logprobs: logprobs });
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
