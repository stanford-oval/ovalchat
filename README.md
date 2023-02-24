# WikiTest

WikiTest is a research project led by Prof. Monica Lam from Stanford University with the goal of improving the factuality of GPT-3 by retrieving data from Wikipedia. See [wiki_llm](https://github.com/stanford-oval/wiki_llm/).

This project built with Next.js, Tailwind CSS, OpenAI's GPT-3, and Microsoft Azure.

## Developer Setup

To run Noora locally for development, install the dependencies from your package manager and start the Next.js app.

```bash
yarn install
yarn run dev
```

Create a `.env.local` file for the following environment variables. 

For the speech-to-text and text-to-speech functionality, create an Azure speech resource (and a corresponding resource group).

```
OPENAI_API_KEY=[your API key]
SPEECH_KEY=[your API key]
SPEECH_REGION=[your API key]