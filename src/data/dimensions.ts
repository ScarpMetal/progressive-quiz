import questions from "./questions";

const dimensions = {
  dimX: {
    from: {
      value: questions.reduce(
        (acc, q) => acc + Math.min(q.disagree[0], q.agree[0]),
        0
      ),
      label: "Meh",
    },
    to: {
      value: questions.reduce(
        (acc, q) => acc + Math.max(q.disagree[0], q.agree[0]),
        0
      ),
      label: "Wow",
    },
  },
  dimY: {
    from: {
      value: questions.reduce(
        (acc, q) => acc + Math.min(q.disagree[1], q.agree[1]),
        0
      ),
      label: "Boring",
    },
    to: {
      value: questions.reduce(
        (acc, q) => acc + Math.max(q.disagree[1], q.agree[1]),
        0
      ),
      label: "Exciting",
    },
  },
};

export default dimensions;
