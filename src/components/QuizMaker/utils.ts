import { GraphInfo } from "components/Graph";

export function questionToGraphInfo(
  question: Question,
  graphInfo: GraphInfo
): GraphInfo {
  return {
    dimX: {
      from: {
        label: graphInfo.dimX.from.label,
        value: question.disagree[0],
      },
      to: {
        label: graphInfo.dimX.to.label,
        value: question.agree[0],
      },
    },
    dimY: {
      from: {
        label: graphInfo.dimY.from.label,
        value: question.disagree[1],
      },
      to: {
        label: graphInfo.dimY.to.label,
        value: question.agree[1],
      },
    },
  };
}

export function graphInfoToQuestion(
  graphInfo: GraphInfo,
  question: Question
): Question {
  return {
    ...question,
    disagree: [graphInfo.dimX.from.value, graphInfo.dimY.from.value],
    agree: [graphInfo.dimX.to.value, graphInfo.dimY.to.value],
  };
}
