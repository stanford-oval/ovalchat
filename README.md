## About

This repository contains researcher-friendly code to quickly bring up a web-based chatbot to conduct user studies.
Features include:
- Multiple users can talk to your chabot at the same time
- Users can select between multiple configurations of your system
- You can easily ask users to select the best system configuration per turn, by showing them side-by-side replies
- The UI is easily customizable
- Ready to deploy to [Vercel](https://vercel.com/)

This project built with Next.js, Tailwind CSS, OpenAI's GPT-3, and Microsoft Azure's Speech Services.

## Customize the UI

To customize the UI, start by changing the following files:
- `src/components/global/custom.tsx`: Contains "branding" information for the website. Update all functions to match your brand.
- `src/data/socials.ts`: Update social media and website links.
- `tailwind.config.js`: Update the theme colors uner `wikichat`.


## Developer Setup

Create a `.env.local` file for the following environment variables. 

For the chatbot to talk to the back-end, you should set `NEXT_PUBLIC_CHAT_BACKEND=https://[your back-end domain]:[port number]` (without `/` at the end).

For the speech-to-text and text-to-speech functionality, create an Azure speech resource (and a corresponding resource group).

```
SPEECH_KEY=[your API key]
SPEECH_REGION=[your API key]
```

## Run in Development Mode
### Implement a custom back-end
A mock back-end implementation is available in `test_backend.py`. You can install `flask`, `flask_cors` and `flask_restful` python packages, then run

```
python test_backend.py
```
This will bring up a local web server on port 5001. Meaning that requests to `http://localhost:5001` will be handled by this server.
You can set `NEXT_PUBLIC_CHAT_BACKEND` to `http://localhost:5001` to develop and test the application on your local system.

This mock implementation only echoes back the inputs it receives. To make your chatbot actually work, you need to implement a custom back-end in this file. Read through `test_backend.py` and implement your own logic there. Most applicactions need to read and write user inputs to/from a database like MongoDB.

To run the front-end locally for development, install the dependencies from your package manager and start the Next.js app.

```bash
yarn install
yarn run dev
```
You will see a message like `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`. This means that you can access the website via a web browser by visiting http://localhost:3000.

