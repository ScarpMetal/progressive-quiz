const baseQuestions: Omit<Question, "id">[] = [
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
}));

export default questions;
