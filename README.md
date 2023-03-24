<p align="center">
    <h1 align="center"><b>OVALChat</b></h1>
    <p align="center">Quick and easy way to conduct user studies with chatbots</p>
    <p align="center">
        <a href="https://stanford.edu" target="_blank">
            <img src="./public/img/logos/stanford/university.png" width="140px" alt="Stanford University" />
        </a>
    </p>
    <p align="center" style="align: center;">
        <a href="https://vercel.com/?utm_source=[stanford-oval]&utm_campaign=oss" target="_blank">
            <img src="./public/img/logos/vercel/powered-by.svg" width="150px" alt="Powered by Vercel" />
        </a>
    </p>
</p>

<hr />

## About

This repository contains researcher-friendly code to quickly bring up a web-based chatbot to conduct user studies.
Features include:
- Support for multiple users at the same time
- Easily customizable UI
- Ready to deploy to [Vercel](https://vercel.com/)
- Support for user studies: You can easily ask users to select the best system configuration per turn, by showing them side-by-side replies via the "Improve" page. They will receive a code after finishing a predetermined number of turns, which can be used to link their response to other platforms like Amazon Mechanical Turk.

This project built with Next.js, Tailwind CSS, OpenAI's GPT-3, and Microsoft Azure's Speech Services.

## Customize the UI

To customize the UI, start by changing the following files:
- `src/components/global/branding.tsx`: Contains "branding" information for the website. Update all functions to match your brand.
- `src/data/socials.ts`: Update social media and website links.
- `tailwind.config.js`: Update the theme colors under `ovalchat`.


## Developer Setup

Create a `.env.local` file for the following environment variables. 

For the chatbot to talk to the back-end, you should set `NEXT_PUBLIC_CHAT_BACKEND=https://[your back-end domain]:[port number]` (without `/` at the end).

For the speech-to-text and text-to-speech functionality, create an Azure speech resource (and a corresponding resource group).

```
SPEECH_KEY=[your API key]
SPEECH_REGION=[your API key]
```

To do crowdsourcing in the "Improve" page, set the following variable to your desired number in the same file.
`NEXT_PUBLIC_CROWDSOURCE_MAX_TURNS=8`

## Run in Development Mode
### Implement a custom back-end
A mock back-end implementation is available in `test_backend.py`. Install the python packages in `requirements.txt`.

This mock implementation only echoes back the inputs it receives. To make your chatbot actually work, you need to implement a custom back-end in this file. Read through `test_backend.py` and implement your own logic there. Most applications need to read and write user inputs to/from a database like MongoDB. If you only have a single user, e.g. when testing the application on your local system, you can use a Python data structure for this purpose instaed of a database, but note that these data structures are not [thread-safe](https://en.wikipedia.org/wiki/Thread_safety) and therefore not suitable for applications that have concurrent users.

### Run the back-end
Run

```
python test_backend.py
```
This will bring up a local web server on port 5001. Meaning that requests to `http://localhost:5001` will be handled by this server.
You can set `NEXT_PUBLIC_CHAT_BACKEND` to `http://localhost:5001` to develop and test the application on your local system.

### Run the front-end
To run the front-end locally for development, install the dependencies from your package manager and start the Next.js app.

```bash
yarn install
yarn run dev
```
You will see a message like `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`. This means that you can access the website via a web browser by visiting http://localhost:3000.

