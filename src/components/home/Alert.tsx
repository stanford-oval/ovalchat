
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';
export default function Alert() {
    // state to show or hide alert
    const [showAlert, setShowAlert] = useState(true);

    if (showAlert)
        return (
            <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-wikichat-primary py-2.5 px-6 sm:px-3.5 sm:before:flex-1">
                <svg
                    viewBox="0 0 577 310"
                    aria-hidden="true"
                    className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <path
                        id="1d77c128-3ec1-4660-a7f6-26c7006705ad"
                        fill="url(#49a52b64-16c6-4eb9-931b-8e24bf34e053)"
                        fillOpacity=".3"
                        d="m142.787 168.697-75.331 62.132L.016 88.702l142.771 79.995 135.671-111.9c-16.495 64.083-23.088 173.257 82.496 97.291C492.935 59.13 494.936-54.366 549.339 30.385c43.523 67.8 24.892 159.548 10.136 196.946l-128.493-95.28-36.628 177.599-251.567-140.953Z"
                    />
                    <defs>
                        <linearGradient
                            id="49a52b64-16c6-4eb9-931b-8e24bf34e053"
                            x1="614.778"
                            x2="-42.453"
                            y1="26.617"
                            y2="96.115"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#5cf77d" />
                            <stop offset={1} stopColor="#251d2e" />
                        </linearGradient>
                    </defs>
                </svg>
                <svg
                    viewBox="0 0 577 310"
                    aria-hidden="true"
                    className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <use href="#1d77c128-3ec1-4660-a7f6-26c7006705ad" />
                </svg>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 justify-center">
                    <p className="text-sm leading-6 text-white">
                        <strong className="font-semibold">WikiChat is under development</strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        Replies may be inaccurate.
                    </p>
                    <Link
                        href="/improve-wikichat"
                        className="mx-auto lg:mx-0 flex-none rounded-full bg-wikichat-secondary py-1 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-wikichat-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        Contribute <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                <div className="flex flex-1 justify-end">
                    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                        onClick={() => setShowAlert(false)}
                    >
                        <span className="sr-only">Dismiss</span>
                        <FontAwesomeIcon icon={faXmark}
                            className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        )
    else
        return <></>
}
