import shuffleArray from "../utils/shuffle-array";
import getUniqueId from "../utils/unique-id";
import PreferenceRequest from "../wiki-llm/PreferenceRequest";

export function userSelect(convoState, history, idx: number, responseInfo?: any) {
  // in the case of isHomePage, we need to pass in the responseInfo because convoState for some reason doesn't have the latest updates
  const ri = responseInfo ?? convoState.value.responseInfo

  history.setValue((h: any) => [
    ...h,
    {
      id: getUniqueId(),
      fromChatbot: true,
      text: ri.responses[idx],
      show: true
    }
  ])

  convoState.setValue((cs: any) => ({
    ...cs,
    turn: "user-answer",
    responseInfo: {
      ...cs.responseInfo,
      rating: "resp" + (idx + 1) // resp1 or resp2 instead of null
    }
  }))

  // this turn has ended, so increment turn_id
  convoState.setValue((cs: any) => ({
    ...cs,
    responseInfo: {
      ...cs.responseInfo,
      turnId: cs.responseInfo.turnId + 1,
      rating: null,
    },
  }));

  if (!convoState.value.isHomePage) {
    let loserSystems = [...convoState.value.allAvailableSystems]
    loserSystems.splice(idx, 1) // other than idx, every system is a loser
    PreferenceRequest(ri.experimentId, ri.dialogId, ri.turnId, convoState.value.allAvailableSystems[idx], loserSystems);

    // shuffle the systems so that the order users see them is random
    if (convoState.value.shouldShuffleSystems) {
      convoState.setValue((cs: any) => ({
        ...cs,
        responseInfo: {
          ...cs.responseInfo,
          randomizedSystemIndices: shuffleArray(cs.responseInfo.randomizedSystemIndices),
        },
      }));
    }
  }

}