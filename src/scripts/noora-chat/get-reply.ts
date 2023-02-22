import Completion from "../gpt-3/Completion";
import { v4 as uuidv4 } from "uuid";
import formPrompt from "../gpt-3/generate-evaluation-prompt";
import data from "../../data/statement_bank/data.json";

const problems = data.data;

function makeIndex(problems: any[]) {
  let counter = 0;
  return (problems.map(p => {
    return ({"idx": counter++, "val": p})
  }));
}

const pairedProblems = makeIndex(problems);

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
      fromNoora: true,
      text: "Oops! Something went wrong.",
      // sentiment: "neutral",
      statement: false,
    },
  ];

  if (command == "get-statement") {
    const statement = await getStatement(convoState)
    replies = [
      {
        id: uuidv4(),
        fromNoora: true,
        text: statement.text,
        // sentiment: statement.sentiment,
        statement: true,
      },
    ];
    if (convoState.value.questionType == "old") {
      // @ts-ignore
      replies[0]["sentiment"] = statement.sentiment;
    }




  } else if (command == "rate-reply") {
    convoState.setValue((cs: any) => ({
      ...cs,
      statement: null,
    }));
    let answers = await getRating(
      message,
      convoState.value.statement.statementIdx,
      convoState.value.statement.statementObj,
      // [...convoState.value.statement.statementObj],
      convoState
    );

    replies = answers.map((a: any) => ({
      id: uuidv4(),
      fromNoora: true,
      text: a.text,
      suggestion: a.suggestion,
      sentiment: a.sentiment ? a.sentiment : "neutral",
      statement: false,
    }));
  }

  convoState.setValue((cs: any) => ({
    ...cs,
    turn: command == (convoState.value.questionType == "old" && "get-statement") ? "user-select" : "user-answer",
  }));

  return replies;
}

async function getRating(
  message: string,
  statementIdx: number,
  statementObj: any,
  convoState: any
) {
  const prompt = formPrompt(statementObj, message);
  let target = statementObj.val.response;

  let classification = "";
  let explanation = "";
  let goodAnswer = false;
  let answers = [];
  let goodReplyConfidence = -1;

  try {
    // first get good/bad answer
    let output = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        model: convoState.value.model.name,
        prompt: prompt,
        temperature: 0,
        max_tokens: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        logprobs: 5,
      }),
    }).then((res) => res.json());

    let probsObj = output["logprobs"]["top_logprobs"][0];

    let probs = softmax(Object.values(probsObj));
    let topTokens = Object.keys(probsObj);

    let goodProb = 0.000001;
    if (topTokens.indexOf(" Good") != -1)
      goodProb = probs[topTokens.indexOf(" Good")];
    let badProb = 0.000001;
    if (topTokens.indexOf(" Bad") != -1)
      badProb = probs[topTokens.indexOf(" Bad")];
    goodReplyConfidence = goodProb / (goodProb + badProb);

    let threshold =
      message.length < 3 ? 0.9 : convoState.value.model.goodReplyThreshold; //  length filtering
    console.log(
      `"good" token probability: ${goodProb}. "bad token" probability: ${badProb}. threshold: ${threshold}`
    );
    if (goodReplyConfidence > threshold) {
      classification = "Good reply.";
      goodAnswer = true;
    } else {
      classification = "Bad reply.";
      goodAnswer = false;
    }

    console.log("Classification: " + classification);

    // console.log(prompt + " " + classification);

    output = await Completion({
      model: convoState.value.model.name,
      prompt: prompt + " " + classification,
      temperature: convoState.value.model.temperature,
      max_tokens: 40,
      frequency_penalty: convoState.value.frequencyPenalty,
      presence_penalty: convoState.value.model.presencePenalty,
      stop: "\n",
    });

    explanation = output.trim();
    console.log("Explanation: " + explanation);

    if (goodAnswer) {
      answers.push({ text: "Good reply!", sentiment: "positive" });
      answers.push({ text: explanation, sentiment: "positive" });
    } else {
      answers.push({ text: "Not quite!" });
      answers.push({ text: explanation });
      answers.push({ text: target.trim(), suggestion: true });
    }
  } catch (error) {
    console.error(error);
    explanation = "Please enter a proper reply.";
    answers = [explanation];
  }

  // SET PROGRESS
  convoState.setValue((cs: any) => ({
    ...cs,
    progress: [
      ...cs.progress,
      {
        idx: statementIdx,
        statement: statementObj[1],
        statementCategory: statementObj[0],
        reply: message,
        explanation: explanation,
        replyCategory: null,
        goodAnswer: goodAnswer,
        goodReplyConfidence: goodReplyConfidence,
        goodReplyThreshold: convoState.value.model.goodReplyThreshold,
      },
    ],
  }));

  return answers;
}

export async function getStatement(convoState: any) {
  // choose module
  const modules = convoState.value.modules.filter((m: any) => m.active);
  const category = getRandomItem(modules).title;
  let filtered_problems = pairedProblems.filter((c: any) => c.val.task_name == category);
  if (convoState.value.questionType == "old") {
    const sentiments = convoState.value.sentiments.filter((s: any) => s.active);
    const sentiment = getRandomItem(sentiments).title;
    filtered_problems = filtered_problems.filter((c: any) => c.val.sentiment == sentiment);
  }
  // await timeout(700);
  // choose statement
  const statementIdx = getStatementIdx(
    category,
    filtered_problems,
    convoState
  );

  const statement = pairedProblems[statementIdx];
  convoState.setValue((cs: any) => ({
    ...cs,
    statement: { statementIdx: statementIdx, statementObj: statement },
  }));

  if (convoState.value.questionType == "old") {
    return { sentiment: statement.val.sentiment, text: statement.val.text };
  }
  return { text: statement.val.text };
}



function getStatementIdx(
  category: string,
  statementsList: any[],
  convoState: any
) {
  let seenIdxs = convoState.value.progress
    .map((p: any) => {
      if (p.statementCategory == category && p.goodAnswer)
        return p.idx; // same category seen, but can repeat ones where user got it wrong
      else {
        return -1;
      }
    })
    .filter((i: number) => i >= 0);
  if (convoState.value.statement)
    seenIdxs.push(convoState.value.statement.statementIdx);
  // console.log("Seen statement indexes:", seenIdxs);

  if (seenIdxs.length >= statementsList.length) {
    console.log("Exhausted all statements. Resetting.");
    seenIdxs = seenIdxs.slice(
      statementsList.length *
      Math.floor(seenIdxs.length / statementsList.length),
      seenIdxs.length
    );
  }

  let newRandomIdx = 0;
  while (true) {
    let possibleIdxs = statementsList.map(c=>c.idx);
    const randomElement = statementsList[Math.floor(Math.random() * possibleIdxs.length)];
    newRandomIdx = randomElement.idx;
    if (seenIdxs.indexOf(newRandomIdx) == -1) break;
  }

  return newRandomIdx;
}

function getRandomItem(items: any) {
  return items[Math.floor(Math.random() * items.length)];
}

function softmax(arr: any[]) {
  return arr.map(function (value: any, index: any) {
    return (
      Math.exp(value) /
      arr
        .map(function (y /*value*/) {
          return Math.exp(y);
        })
        .reduce(function (a, b) {
          return a + b;
        })
    );
  });
}
