export default async function PreferenceRequest(experimentId: string, dialogId: string, turnId: number, winnerSystem: string, loserSystem: string) {
    console.log("im here")
    console.log(winnerSystem, loserSystem)
    
    await fetch(process.env.CHAT_BACKEND + "/user_preference", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            experiment_id: experimentId,
            dialog_id: dialogId,
            turn_id: turnId,
            winner_system: winnerSystem,
            loser_system: loserSystem
        })
    }).then((res) => res.json())
}