// Edit this page to customize the website UI

import Image from "next/image";


export function chatbotName() {
    return "WikiChat"
}

export function allAvailableSystems() {
    return [
        "Balanced     [pipeline=early_combine, engine=gpt-35-turbo-instruct, draft_engine=gpt-4, generate_engine=gpt-35-turbo-instruct, do_refine=false]",
        "Fastest      [pipeline=early_combine, engine=gpt-35-turbo-finetuned, draft_engine=gpt-35-turbo-finetuned, generate_engine=gpt-35-turbo-finetuned, do_refine=false, fuse_claim_splitting=true]",
        "Most Factual [pipeline=early_combine, engine=gpt-4, draft_engine=gpt-4, generate_engine=gpt-4, do_refine=true]",
        // "WikiChat (GPT-4)[pipeline=early_combine, engine=gpt-4, do_refine=false]",
        // "early_combine[engine=llama]",
        // "generate[engine=gpt-4]",
        // "verify_and_correct[engine=text-davinci-003]",
        // "retrieve_and_generate[engine=text-davinci-003]",
        // "retrieve_generate_verify_correct[engine=text-davinci-003]",
        // "retrieve_only[engine=text-davinci-003]"
    ]
}

export function userScores() {
    return {
        "user_factuality_rating": {
            "type": "binary",
            "prompt": "Is this reply factually correct?",
            "labelForTrue": "Yes",
            "labelForFalse": "No",
        },
        "user_factuality_confidence": {
            "type": "binary",
            "prompt": "Are you confident in your choice above?",
            "labelForTrue": "Yes",
            "labelForFalse": "No",
        },
        "user_naturalness_rating": {
            "type": "slider",
            "min": 1,
            "max": 5,
            "prompt": "How natural is this reply?",
            "label1": "Unnatural",
            "label2": "Natural",
        },
    }
}


export function pageDescription() {
    return "WikiChat is an experimental chatbot that improves the factuality of large language models by retrieving data from Wikipedia."
}

export function chatbotTagLine() {
    return "Wikipedia + LLM"
}

export function chatbotDescription() {
    return "WikiChat is an experimental chatbot that improves the factuality of large language models by retrieving data from Wikipedia."
}

export function chatbotRepository() {
    return <a href="https://github.com/stanford-oval/WikiChat" target="_blank">https://github.com/stanford-oval/WikiChat</a>
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
            <Image alt="vercel logo" src="/img/logos/vercel/powered-by.svg" className="mx-auto" height="38" width="170" />
        </a>
    </>
}

export function aboutPage() {
    return <>
        <h3 className="text-3xl pt-10 pb-3">
            What is WikiChat?
        </h3>
        <p className="text-lg">
            Large language model (LLM) chatbots like ChatGPT and GPT-4 are great tools for quick access to knowledge.
            But they get things wrong a lot, especially if the information you are looking for is recent ("Tell me about the 2024 Super Bowl.") or about less popular topics ("What are some good movies to watch from [insert your favorite foreign director]?").
            <br></br>
            WikiChat uses an LLM as its backbone, but it makes sure the information it provides comes from a reliable source like Wikipedia, so that its responses are more factual.
        </p>

        <h3 className="text-3xl pt-10 pb-3">

            What is this website?
        </h3>
        <p className="text-lg">

            We are hosting WikiChat to better understand the system in the wild. Thank you for giving it a try!
            <br></br>
            For further research on factual chatbots, we store conversations conducted on this website in a secure database. Only the text that you submit is stored. We do NOT collect or store any other information.
        </p>


        <h3 className="text-3xl pt-10 pb-3">
            I found a factual mistake in WikiChat's responses.
        </h3>
        <p className="text-lg">
            In our benchmarks, the version of WikiChat that uses GPT-4 as its backbone achieves a factual accuracy of 97.9%, much better than GPT-4 on its own. However, the default version on this website uses OpenAI's <code className="">gpt-35-turbo-instruct</code> because of its lower cost and latency, which means there will be more inaccuracies.
            <br></br>
            For the highest factual accuracy, we recommend using WikiChat with GPT-4. You can try it by selecting the "Most Factual" system from the sidebar, or by providing your own API key, following the step-by-step guide at the <a className="text-blue-600" href="https://github.com/stanford-oval/WikiChat" target="_blank">WikiChat GitHub Repository</a>.
        </p>

        <h3 className="text-3xl pt-10 pb-3">
            How does WikiChat work?
        </h3>
        <p className="text-lg">
            Given the user input and the history of the conversation, WikiChat performs the following actions:
        </p>
        <ol className="list-decimal pl-10 py-4">
            <li>
                Searches Wikipedia to retrieve relevant information.
            </li>
            <li>
                Summarizes and filters the retrieved passages.
            </li>
            <li>
                Generates a response using a Language Learning Model (LLM).
            </li>
            <li>
                Extracts claims from the LLM response.
            </li>
            <li>
                Fact-checks the claims in the LLM response using additional retrieved evidence it retrieves from Wikipedia.
            </li>
            <li>
                Drafts a response.
            </li>
            <li>Refines the drafted response.

            </li>
        </ol>
        <p className="text-lg">

            The following figure shows how these steps are applied during a sample conversation about an upcoming movie at the time, edited for brevity.
        </p>
        <div className="flex flex-col justify-center items-center m-10 mb-5">

            <Image
                className=""
                width="1000"
                height="800"
                fill={false}
                src={"/img/other/pipeline.svg"}
                alt={chatbotName() + " pipeline"}
            />

            {/* <div className="w-4/5">
                                All WikiChat components, and a sample conversation about a recent movie, edited for brevity. The
                                steps taken to generate a response include (1) generating a query to retrieve from Wikipedia, (2) summarizing
                                and filtering the retrieved passages, (3) generating a response from an LLM, (4) extracting claims from the LLM
                                response (5) fact-checking the claims in the LLM response using retrieved evidence, (6) drafting a response, and (7)
                                refining the response.
                            </div> */}
        </div>


        <h3 className="text-3xl pt-10 pb-3">
            How can I learn more?
        </h3>
        <p className="text-lg">

            Check out our paper!
            <br></br><br></br>
            Sina J. Semnani, Violet Z. Yao<sup>*</sup>, Heidi C. Zhang<sup>*</sup>, and Monica S. Lam. 2023. <b>WikiChat: Stopping the Hallucination of Large Language Model Chatbots by Few-Shot Grounding on Wikipedia.</b> In Findings
            of the Association for Computational Linguistics: EMNLP 2023, Singapore. Association for Computational Linguistics.
            [<a href="https://arxiv.org/abs/2305.14292">arXiv</a>]
        </p>

        <h3 className="text-3xl pt-10 pb-3">
            Contact Us
        </h3>
        <p className="text-lg">
            
            Email: <a href="mailto:genie@cs.stanford.edu">genie@cs.stanford.edu</a>
        </p>
    </>
}

export function crowdsourcingMessages() {
    return [
        "Your responses will be recorded for research purposes, so please do not share any Personal Identifiable Information.",
        "I'm still in development, so if I don't understand something you said, please try and continue the conversation.",
        // "I can talk about anything until March 23rd of this year.",
        // "First, select one of these movies from 2022 that you are familiar with or want to learn more about:\n \
        // - Avatar: The Way of Water\n \
        // - Top Gun: Maverick\n \
        // - Jurassic World: Dominion\n \
        // - Doctor Strange in the Multiverse of Madness\n \
        // - Minions: The Rise of Gru\n \
        // - Black Panther: Wakanda Forever\n \
        // - The Batman\n \
        // - Thor: Love and Thunder\n \
        // - Puss in Boots: The Last Wish\n \
        // - Fantastic Beasts: The Secrets of Dumbledore\n \
        // - Sonic the Hedgehog 2",
        // "Start by talking about that movie, and see where the conversation takes you.",
        // "At each turn, you will see responses from " + allAvailableSystems().length.toString() + " chatbots. You are asked to rate each response, then select the response that you prefer."
    ]
}

export function mainPageMessages() {
    return [
        "I'll keep our conversations for research purposes.",
        "By default, I balance factuality and speed. You can try other versions of WikiChat from the sidebar.",
        "Ask me about anything on Wikipedia!",
    ]
}

// You can remove the pages you don't need. Removing an item from this list will remove all links to that page from the website,
// but the page will still be accessible from its href
export const routes = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "/about",
    },
    // {
    //     name: "Contribute",
    //     href: "/improve",
    // },
    // {
    //     name: "Compare",
    //     href: "/compare",
    // },
];

export const showFooter = true