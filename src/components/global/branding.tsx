// Edit this page to customize the website UI

import Image from "next/image";


export function chatbotName() {
    return "WikiChat"
}

export function allAvailableSystems() {
    return [
        "generate[engine=text-davinci-003]",
        // "generate[engine=gpt-4]",
        "verify_and_correct[engine=text-davinci-003]",
        "retrieve_and_generate[engine=text-davinci-003]",
        // "retrieve_generate_verify_correct[engine=text-davinci-003]",
        // "retrieve_only[engine=text-davinci-003]"
    ]
}

export function userScores() {
    return {
        "user_factuality_rating": {
            "type": "binary",
            "prompt": "Is this reply factually correct?",
            "backendLabel": "user_factuality_rating"
        },
        "user_factuality_confidence": {
            "type": "slider",
            "min": 1,
            "max": 5,
            "label1": "Not sure at all",
            "label2": "Completely sure",
            "prompt": "How confident are you in your choice above?",
            "backendLabel": "user_factuality_confidence"
        },
        "user_naturalness_rating": {
            "type": "slider",
            "min": 1,
            "max": 5,
            "label1": "Unnatural",
            "label2": "Natural",
            "prompt": "How natural is this reply?",
            "backendLabel": "user_naturalness_rating"
        },
    }
}


export function pageDescription() {
    return "WikiChat is an experimental chatbot aimed at improving the factuality of GPT-3 by retrieving data from Wikipedia."
}

export function chatbotTagLine() {
    return "Stay informed with WikiChat."
}

export function chatbotDescription() {
    return "WikiChat is an experimental chatbot aimed at improving the factuality of large language models such as GPT-3 by retrieving data from Wikipedia."
}

export function chatbotLogo() {
    return "/img/logos/chatbot/wikipedia.png"
}

export function websitePreviewImage() {
    return "/img/other/preview.png"
}

export function footerMessage() {
    return (
        <>
            WikiChat is part of a research project at Stanford University&apos;s{" "}
            <a
                href="https://oval.cs.stanford.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-gray-200 trans-150"
            >
                Open Virtual Assistant Lab
            </a>
            .
        </>
    )
}

export function developedByHeader() {
    return <>
        <a
            href="https://oval.cs.stanford.edu/"
            className="font-medium text-[#8C1515]"
            target="_blank"
            rel="noopener noreferrer"
        >
            Stanford&apos;s Open Virtual Assistant Lab
        </a>
    </>
}


export function footerSponsors() {
    return <>
        <a
            href="https://vercel.com/?utm_source=[stanford-oval]&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image alt="vercel logo" src="/img/logos/vercel/powered-by.svg" className="mx-auto" height="38" width="200" />
        </a>
    </>
}

export function crowdsourcingMessages() {
    return [
        "Your responses will be recorded for research purposes, so please do not share any Personal Identifiable Information.",
        "I'm still in development, so if I don't understand something you said, please try and continue the conversation.",
        "I can talk about anything recent until February 1st of this year. For example, I can talk about movies, books, music, celebrities, and many more topics.",
        "What would you like to talk about today?"
    ]
}

export function mainPageMessages() {
    return [
        "Your responses are recorded for research purposes, so please do not share any Personal Identifiable Information.",
        "Let's chat!"
    ]
}
