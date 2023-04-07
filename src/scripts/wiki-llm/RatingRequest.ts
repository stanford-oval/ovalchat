import { userScores } from "../../components/global/branding"

export default async function RatingRequest(experimentId: string, dialogId: string, turnId: number, systemName: string, userRatings) {
    const requestBody = {
        experiment_id: experimentId,
        dialog_id: dialogId,
        turn_id: turnId,
        system_name: systemName
    }
    // for every userScores(), add its corresponding value from userRatings to the request body
    for (let i = 0; i < Object.keys(userScores()).length; i++) {
        requestBody[Object.keys(userScores())[i]] = userRatings[i]
    }

    await fetch(process.env.NEXT_PUBLIC_CHAT_BACKEND + "/user_rating", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }).then((res) => res.json())
}