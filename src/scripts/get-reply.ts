export default async function getReply(
  message: string,
  id: string,
  convoState: any,
  setConvoState: any
) {
  setConvoState({ turn: "wikitest-reply" });
  let reply = message;
  await timeout(5000);
  return {
    id: id,
    fromChatbot: true,
    text: "I currently only echo you. Here was your message: " + reply,
  };
}

function timeout(ms: number) {
  // for testing purposes
  return new Promise((resolve) => setTimeout(resolve, ms));
}
