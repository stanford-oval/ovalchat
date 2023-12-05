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
- Support for user studies: You can easily ask users to select the best system configuration per turn, by showing them side-by-side replies via the "Contribute" page. They will receive a code after finishing a predetermined number of turns, which can be used to link their response to other platforms like Amazon Mechanical Turk.

This project built with Next.js, Tailwind CSS, OpenAI's GPT-3, and Microsoft Azure's Speech Services.

## Customize the UI

<p align="center">
    <img src="https://user-images.githubusercontent.com/60150701/227457109-82c5e33e-8c17-4a10-82bf-acbbd87857fb.png" height="300"/>
    <br>
    This is what the default chat interface looks like.
</p>

You can customize this and the full page, by simply changing the following files:
- `src/components/global/branding.tsx`: Contains "branding" information for the website. Update all functions to match your brand.
- `src/data/socials.ts`: Update social media and website links.
- `tailwind.config.js`: Update the theme colors under `ovalchat`.


## Developer Setup

Create a `.env.local` file for the following environment variables. 

For the chatbot to talk to the back-end, you should set `NEXT_PUBLIC_CHAT_BACKEND=https://[your back-end domain]:[port number]` (without `/` at the end).

For the speech-to-text and text-to-speech functionality, create an Azure speech resource (and a corresponding resource group).

```bash
SPEECH_KEY=[your API key]
SPEECH_REGION=[your API key]
```

To do crowdsourcing in the "Contribute" page, set the following variables to your desired values in the same file.
```bash
NEXT_PUBLIC_CROWDSOURCE_MAX_TURNS=8     # Users will be prompted to stop after this many turns
```

## Run in Development Mode
### Implement a custom back-end
A mock back-end implementation is available in `test_backend.py`. Install the python packages in `requirements.txt`.

This mock implementation only echoes back the inputs it receives. To make your chatbot actually work, you need to implement a custom back-end in this file. Read through `test_backend.py` and implement your own logic there. Most applications need to read and write user inputs to/from a database like MongoDB. If you only have a single user, e.g. when testing the application on your local system, you can use a Python data structure for this purpose instaed of a database, but note that these data structures are not [thread-safe](https://en.wikipedia.org/wiki/Thread_safety) and therefore not suitable for applications that have concurrent users.

### Run the back-end
Run

```bash
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

## Deploy the front-end
So far, we have been running the server in "development" mode, where changes to the code automatically refreshes any open webpage, and provides extensive debugging information when an error happens. This is not needed when deploying the front-end, and just slows down the website. To run the server in deployment mode, run:
```bash
yarn build
yarn start
```
If you want to deploy the front-end on port 80 (so that you can visit the front-end without the need to type in a port number in the browser), you need to first give node permission to use ports below 1024. Run:
```bash
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```
Then add `-p 80` option to the above `yarn start` command.

### Deploy the front-end to Vercel
This website can be easily deployed to vercel.com
If you want to deploy from a branch other than `main`, you need to change the `vercel-deploy-branch.sh` script to allow your branch to be deployed.

## Citation

If you have used this repository, please cite the following paper:

```bibtex
@inproceedings{semnani-etal-2023-wikichat,
    title = "{W}iki{C}hat: Stopping the Hallucination of Large Language Model Chatbots by Few-Shot Grounding on Wikipedia",
    author = "Semnani, Sina  and
      Yao, Violet and
      Zhang, Heidi and 
      Lam, Monica",
    booktitle = "Findings of the Association for Computational Linguistics: EMNLP 2023",
    month = dec,
    year = "2023",
    address = "Resorts World Convention Centre, Singapore",
    publisher = "Association for Computational Linguistics",
}
```