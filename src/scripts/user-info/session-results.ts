import { writeResultToLocal } from "./local-storage-utils";

export function saveSessionResult(progressObj: any) {
    let result = {
        timeCompleted: Date.now(),
        scores: {
            // [correct, attempted]
            // positive, neutral, negative
            total: [0, 0]
        }
    }

    progressObj.forEach((problem: any) => {
        let sentiment = problem.statementCategory.split("/")[1]
        let sentimentKey = sentiment as keyof typeof result.scores
        if (!result.scores[sentimentKey])
            result.scores[sentimentKey] = [0, 0]

        result.scores[sentimentKey][1]++;
        result.scores.total[1]++;
        result.scores[sentimentKey][0] += problem.goodAnswer ? 1 : 0;
        result.scores.total[0] += problem.goodAnswer ? 1 : 0;
    })

    console.log("### Saving to progress: ", result)
    writeResultToLocal(result)
    console.log("### Done saving to progress")
}