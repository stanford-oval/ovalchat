export default async function RatingRequest(experimentId: string, dialogId: string, turnId: number, systemName: string, userNaturalnessRating: number, userFactualityRating: boolean, userFactualityConfidence: number) {
    await fetch(process.env.CHAT_BACKEND + "/user_rating", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            experiment_id: experimentId,
            dialog_id: dialogId,
            turn_id: turnId,
            user_naturalness_rating: userNaturalnessRating,
            user_factuality_rating: userFactualityRating,
            user_factuality_confidence: userFactualityConfidence,
            system_name: systemName
        })
    }).then((res) => res.json())
}