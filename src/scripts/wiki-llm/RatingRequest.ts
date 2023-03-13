export default async function RatingRequest(experimentId: string, dialogId: string, turnId: number, systemName: string, userNaturalnessRating: number) {
    await fetch("http://localhost:5001/user_rating", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            experiment_id: experimentId,
            dialog_id: dialogId,
            turn_id: turnId,
            user_naturalness_rating: userNaturalnessRating,
            system_name: systemName
        })
    }).then((res) => res.json())
}