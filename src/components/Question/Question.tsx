import { resultsAtom } from "atoms";
import PageContent from "components/PageContent/PageContent";
import { StepAction } from "components/Stepper";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import "./Question.scss";

const Question = ({
  questions,
  index,
  question,
  goToNext,
}: {
  questions: Question[];
  index: number;
  question: Question;
  goToNext: StepAction;
}) => {
  const [results, setResults] = useAtom(resultsAtom);
  const result = useMemo(() => results[question.id], [question.id, results]);

  const handleSelectAnswer = useCallback(
    (result: Result) => {
      setResults((prev) => ({ ...prev, [question.id]: result }));
      goToNext();
    },
    [goToNext, question.id, setResults]
  );

  return (
    <PageContent className="question">
      <div className="count">
        {index + 1} / {questions.length}
      </div>
      <div className="text">{question.text}</div>
      <div className="choices">
        <button
          type="button"
          className="choice"
          data-selected={result === 1}
          onClick={() => handleSelectAnswer(1)}
        >
          Strongly Disagree
        </button>
        <button
          type="button"
          className="choice"
          data-selected={result === 2}
          onClick={() => handleSelectAnswer(2)}
        >
          Disagree
        </button>
        <button
          type="button"
          className="choice"
          data-selected={result === 3}
          onClick={() => handleSelectAnswer(3)}
        >
          Neutral
        </button>
        <button
          type="button"
          className="choice"
          data-selected={result === 4}
          onClick={() => handleSelectAnswer(4)}
        >
          Agree
        </button>
        <button
          type="button"
          className="choice"
          data-selected={result === 5}
          onClick={() => handleSelectAnswer(5)}
        >
          Strongly Agree
        </button>
      </div>
    </PageContent>
  );
};

export default Question;
