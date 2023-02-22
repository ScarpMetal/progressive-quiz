import { resultsAtom } from "atoms";
import PageContent from "components/PageContent/PageContent";
import { StepAction } from "components/Stepper";
import dimensions from "data/dimensions";
import questions from "data/questions";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { map } from "utils";
import "./Results.scss";
import sketch, { Dimension } from "./sketch";

type GraphInfo = {
  dimX: Dimension;
  dimY: Dimension;
};

export default function Results({
  goToStart,
  goToNext,
}: {
  goToStart: StepAction;
  goToNext: StepAction;
}) {
  const results = useAtomValue(resultsAtom);
  const graphInfo = useMemo(() => {
    const [value1, value2] = questions.reduce(
      (acc, question) => {
        const result = results[question.id];
        if (result >= 1 && result <= 5) {
          const value1 = map(
            result,
            1,
            5,
            question.disagree[0],
            question.agree[0]
          );
          const value2 = map(
            result,
            1,
            5,
            question.disagree[1],
            question.agree[1]
          );
          return [acc[0] + value1, acc[1] + value2];
        }
        return acc;
      },
      [0, 0]
    );
    const graphInfo: GraphInfo = {
      dimX: {
        ...dimensions.dimX,
        value: value1,
      },
      dimY: {
        ...dimensions.dimY,
        value: value2,
      },
    };
    return graphInfo;
  }, [results]);

  const resultLabel = "Unilateral thinker";
  console.log("graphInfo", graphInfo);
  return (
    <PageContent className="results">
      <h2>Results</h2>
      <h1>You're a {resultLabel}!</h1>
      <ReactP5Wrapper sketch={sketch} info={graphInfo} />
      <div className="actions">
        <button type="button" onClick={goToStart}>
          Restart
        </button>
        {/* <button type="button" onClick={goToNext}>
          View Acknowledgements
        </button> */}
      </div>
    </PageContent>
  );
}
