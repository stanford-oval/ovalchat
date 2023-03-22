# WikiChat

WikiChat is a research project led by Prof. Monica Lam from Stanford University with the goal of improving the factuality of GPT-3 by retrieving data from Wikipedia.

This project built with Next.js, Tailwind CSS, OpenAI's GPT-3, and Microsoft Azure.

## Developer Setup

To run Noora locally for development, install the dependencies from your package manager and start the Next.js app.

```bash
yarn install
yarn run dev
```

Create a `.env.local` file for the following environment variables. 

For the chatbot to talk to the back-end, you should set `NEXT_PUBLIC_CHAT_BACKEND=https://[your back-end domain]:[port number]` (without `/` at the end).

For the speech-to-text and text-to-speech functionality, create an Azure speech resource (and a corresponding resource group).

```
SPEECH_KEY=[your API key]
SPEECH_REGION=[your API key]
```

## Test with back-end
A mock back-end implementation is available in `test_backend.py`. You can install `flask`, `flask_cors` and `flask_restful` python packages, then run

```
python test_backend.py
```