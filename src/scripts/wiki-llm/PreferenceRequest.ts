export default async function PreferenceRequest(experimentId: string, dialogId: string, turnId: number, winnerSystem: string, loserSystems: string[]) {
    // console.log(winnerSystem, loserSystems)
    
    await fetch(process.env.NEXT_PUBLIC_CHAT_BACKEND + "/user_preference", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            experiment_id: experimentId,
            dialog_id: dialogId,
            turn_id: turnId,
            winner_system: winnerSystem,
            loser_systems: loserSystems
        })
    }).then((res) => res.json())
}