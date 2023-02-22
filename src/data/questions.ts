import { getIdString } from "utils";

const baseQuestions: BaseQuestion[] = [
  { text: "How do you feel about things?", disagree: [1, -1], agree: [-1, 1] },
  { text: "Are you okay?", disagree: [1, -1], agree: [-1, 1] },
  { text: "Are you sure?", disagree: [1, -1], agree: [-1, 1] },
  { text: "I'll take your word for it...", disagree: [1, -1], agree: [-1, 1] },
  {
    text: "How do you feel about things? Okay but this one is going to be a very long questions to see how our wrapping functionality works okay get it got it good",
    disagree: [1, -1],
    agree: [-1, 1],
  },
  { text: "Are you okay?", disagree: [1, -1], agree: [-1, 1] },
  { text: "Are you sure?", disagree: [1, -1], agree: [-1, 1] },
  { text: "I'll take your word for it...", disagree: [1, -1], agree: [-1, 1] },
  { text: "How do you feel about things?", disagree: [1, -1], agree: [-1, 1] },
  { text: "Are you okay?", disagree: [1, -1], agree: [-1, 1] },
];

const questions: Question[] = baseQuestions.map((baseQuestion, index) => ({
  ...baseQuestion,
  id: `ID-${index}`,
  nextId: index + 1 < baseQuestions.length ? getIdString(index + 1) : null,
  prevId: index - 1 >= 0 ? getIdString(index - 1) : null,
}));

export default questions;
