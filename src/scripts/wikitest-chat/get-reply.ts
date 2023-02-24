import { v4 as uuidv4 } from "uuid";

export default async function getReply(
  message: string,
  convoState: any,
  command: string
) {
  // response loading
  convoState.setValue((cs: any) => ({ ...cs, turn: command }));

  let replies = [
    {
      id: uuidv4(),
      fromChatbot: true,
      text: "Oops! Something went wrong.",
    },
  ];

  convoState.setValue((cs: any) => ({
    ...cs,
    turn: "user-answer", // update this
  }));

  return replies;
}