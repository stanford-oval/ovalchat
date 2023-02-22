import React from "react";
import useSWR from 'swr'
import dateFormat from "dateformat";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import clsx from "clsx";
import Progress from "../interfaces/noora-chat/menu/sections/Progress";

export default function AttemptHistory() {
    const { data } = useSWR("progress", key => {
        const value = localStorage.getItem(key);
        return !!value ? JSON.parse(value) : undefined;
    })

    return (
        <div className="grid grid-cols-12 pt-3 gap-y-3">
            {data && data.map((attempt: any, idx: number) => {
                let dateStr = dateFormat(new Date(attempt.timeCompleted), "mmmm dS, h:MM TT");
                return (
                    <div key={idx} className="col-span-12 flex gap-y-4 flex-col md:flex-row rounded-lg justify-between items-center text-factgpt-secondary  px-5 py-6 bg-gray-100 border-2 border-gray-200">
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-slate-500">
                                {dateStr}
                            </p>
                            <h1 className="text-2xl font-medium">Attempt {data.length - idx}</h1>
                        </div>
                        <div className="flex items-stretch flex-wrap justify-center flex-row gap-x-4 gap-y-3">
                            <ProgressCircle num={attempt.scores.total[0]} denom={attempt.scores.total[1]} title="total" />
                            <div className="border-gray-300 bg-gray-300 border-1 hidden sm:block"></div>
                            {Object.keys(attempt.scores).map((k: any) => {
                                k = k as keyof typeof attempt.scores
                                if (k == "total" || attempt.scores[k][1] == 0) return <div key={k}></div>
                                return <ProgressCircle key={k} num={attempt.scores[k][0]} denom={attempt.scores[k][1]} title={k} />
                            })}
                        </div>
                    </div>)
            })
            }
        </div >
    );
}

function ProgressCircle({ num, denom, title }: any) {
    return <div className="w-24 h-24 text-xl">
        <CircularProgressbarWithChildren styles={{
            // Customize the root svg element
            root: {},
            // Customize the path, i.e. the "completed progress"
            path: {
                // Path color
                stroke: `rgba(${title == "total" ? "105, 64, 182" : "62, 152, 199"}, ${num / denom})`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
                // Trail color
                stroke: '#dbdbdb',
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Rotate the trail
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
            },
        }} value={num} maxValue={denom} strokeWidth={12}>
            <div className={clsx("text-xl", title == "total" ? "font-bold text-factgpt-primary-dark" : "text-factgpt-secondary")}>{`${num}/${denom}`}</div>
            <div className={clsx("text-xs -mt-1 text-gray-600", title)}>{title}</div>
        </CircularProgressbarWithChildren>
    </div>
}
