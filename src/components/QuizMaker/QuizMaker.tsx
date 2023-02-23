import Graph, { GraphInfo } from "components/Graph";
import { OUTCOME_DIM } from "components/Graph/Graph";
import PageContent from "components/PageContent/PageContent";
import { Step, StepAction, Steps } from "components/Stepper";
import { usePrevious } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { getRandomId } from "utils";
import Input from "./components/Input";
import Outcome from "./components/Outcome";
import "./QuizMaker.scss";
import { graphInfoToQuestion, questionToGraphInfo } from "./utils";

function createNewQuestion(): Question {
  return {
    id: getRandomId(),
    text: "",
    agree: [Math.random(), Math.random()],
    disagree: [-Math.random(), -Math.random()],
  };
}

function createNewOutcome(): Outcome {
  return {
    id: getRandomId(),
    text: "",
    subtext: "",
  };
}

function createNewOutcomes(): Outcomes {
  const defaultOutcome: Outcome = createNewOutcome();
  const grid: OutcomeGrid = [];
  for (let r = 0; r < OUTCOME_DIM; r++) {
    const row = [];
    for (let c = 0; c < OUTCOME_DIM; c++) {
      row.push(defaultOutcome.id);
    }
    grid.push(row);
  }
  return {
    grid,
    outcomes: {
      [defaultOutcome.id]: defaultOutcome,
    },
  };
}

export default function QuizMaker() {
  const [questions, setQuestions] = useState<Question[]>([createNewQuestion()]);
  const [dimensions, setDimensions] = useState<GraphInfo>({
    dimX: {
      from: {
        label: "",
        value: -1,
      },
      to: {
        label: "",
        value: 1,
      },
    },
    dimY: {
      from: {
        label: "",
        value: -1,
      },
      to: {
        label: "",
        value: 1,
      },
    },
  });
  const [outcomes, setOutcomes] = useState<Outcomes>(createNewOutcomes());
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<
    OutcomeId | undefined
  >();
  const [hoverOutcomeId, setHoverOutcomeId] = useState<OutcomeId>();
  const [scrollToNext, setScrollToNext] = useState<StepAction | undefined>();
  const lastQuestionsCount = usePrevious(questions.length);

  const handleAddQuestion = useCallback((scrollToNext?: StepAction) => {
    setQuestions((prev) => [...prev, createNewQuestion()]);
    setScrollToNext(() => scrollToNext);
  }, []);

  const handleQuestionValueChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      property: keyof Question,
      id: QuestionId
    ) => {
      setQuestions((prev) =>
        prev.map((question) => {
          if (question.id === id) {
            return {
              ...question,
              [property]: e.target.value,
            };
          }
          return question;
        })
      );
    },
    []
  );

  const handleRemoveQuestion = useCallback((questionId: QuestionId) => {
    const shouldRemove = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (shouldRemove) {
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    }
  }, []);

  const handleChangeLabel = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      label: "xfrom" | "xto" | "yfrom" | "yto"
    ) => {
      const text = e.target.value;
      switch (label) {
        case "xfrom":
          setDimensions((prev) => ({
            ...prev,
            dimX: {
              ...prev.dimX,
              from: {
                ...prev.dimX.from,
                label: text,
              },
            },
          }));
          break;
        case "xto":
          setDimensions((prev) => ({
            ...prev,
            dimX: {
              ...prev.dimX,
              to: {
                ...prev.dimX.to,
                label: text,
              },
            },
          }));
          break;
        case "yfrom":
          setDimensions((prev) => ({
            ...prev,
            dimY: {
              ...prev.dimY,
              from: {
                ...prev.dimY.from,
                label: text,
              },
            },
          }));
          break;
        case "yto":
          setDimensions((prev) => ({
            ...prev,
            dimY: {
              ...prev.dimY,
              to: {
                ...prev.dimY.to,
                label: text,
              },
            },
          }));
          break;
      }
    },
    []
  );

  const setNewGraphInfo = useCallback(
    (questionId: QuestionId, graphInfo: GraphInfo) => {
      setQuestions((prev) =>
        prev.map((question) => {
          if (question.id === questionId) {
            return graphInfoToQuestion(graphInfo, question);
          }
          return question;
        })
      );
    },
    []
  );

  const setNewOutcomeGrid = useCallback((newGrid: OutcomeGrid) => {
    setOutcomes((prev) => {
      return {
        ...prev,
        grid: newGrid,
      };
    });
  }, []);

  const handleAddOutcome = useCallback(() => {
    const newOutcome = createNewOutcome();
    setOutcomes((prev) => ({
      ...prev,
      outcomes: { ...prev.outcomes, [newOutcome.id]: newOutcome },
    }));
  }, []);

  const handleOutcomeValueChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      property: keyof Outcome,
      id: OutcomeId
    ) => {
      setOutcomes((prev) => {
        return {
          ...prev,
          outcomes: {
            ...prev.outcomes,
            [id]: {
              ...prev.outcomes[id],
              [property]: e.target.value,
            },
          },
        };
      });
    },
    []
  );

  const canRemoveOutcome = useCallback(
    (outcomeId: OutcomeId) => {
      return (
        Object.keys(outcomes.outcomes).length > 1 &&
        !outcomes.grid.some((row) => row.some((id) => id === outcomeId))
      );
    },
    [outcomes]
  );

  const handleRemoveOutcome = useCallback(
    (outcomeId: OutcomeId) => {
      if (canRemoveOutcome(outcomeId)) {
        setOutcomes((prev) => {
          const nextOutcomes = { ...prev.outcomes };
          delete nextOutcomes[outcomeId];

          return {
            outcomes: nextOutcomes,
            grid: prev.grid,
          };
        });
      }
      console.log(
        "could not remove outcome because it is either in the grid or it is the last one left"
      );
    },
    [canRemoveOutcome]
  );

  // Make sure there is always at least 1 question
  useEffect(() => {
    if (questions.length <= 0) {
      handleAddQuestion();
    }
  }, [handleAddQuestion, questions.length]);

  // Scroll to new question when added
  useEffect(() => {
    if (
      scrollToNext &&
      lastQuestionsCount &&
      lastQuestionsCount + 1 === questions.length
    ) {
      scrollToNext();
      setScrollToNext(undefined);
    }
  }, [lastQuestionsCount, questions.length, scrollToNext]);

  return (
    <div className="quiz-maker">
      <Steps>
        <Step index={0}>
          {({ dark }) => (
            <PageContent className="home">
              <div className="headers">
                <Input
                  label="Title"
                  containerProps={{ style: { fontSize: "1.5em" } }}
                />
                <Input label="Subtitle" />
              </div>
              <div className="graph-label-display">
                <div className="top container">
                  <div>Graph Labels</div>
                  <Input onChange={(e) => handleChangeLabel(e, "yto")} />
                </div>
                <div className="left container">
                  <Input onChange={(e) => handleChangeLabel(e, "xfrom")} />
                </div>
                <div className="right container">
                  <Input onChange={(e) => handleChangeLabel(e, "xto")} />
                </div>
                <div className="bottom container">
                  <Input onChange={(e) => handleChangeLabel(e, "yfrom")} />
                </div>

                <div className="center">
                  <Graph info={dimensions} dark={!dark} />
                </div>
              </div>
            </PageContent>
          )}
        </Step>
        {questions.map((question, index) => {
          const isLastQuestion = index === questions.length - 1;
          const graphInfo = questionToGraphInfo(question, dimensions);
          return (
            <Step key={question.id} index={1 + index}>
              {({ goToNext, dark }) => (
                <>
                  <PageContent className="qm-question">
                    <div className="count">
                      {index + 1} / {questions.length}
                    </div>
                    <Input
                      label="Text"
                      containerProps={{ style: { fontSize: "1.1em" } }}
                      onChange={(e) =>
                        handleQuestionValueChange(e, "text", question.id)
                      }
                      value={question.text}
                    />
                    <div className="graph-container">
                      <div className="graph-label">Adjust Results</div>
                      <Graph
                        info={graphInfo}
                        dark={!dark}
                        onAdjust={(graphInfo) =>
                          setNewGraphInfo(question.id, graphInfo)
                        }
                      />
                    </div>
                    {questions.length > 1 && (
                      <button
                        className="remove-question-button"
                        type="button"
                        onClick={() => handleRemoveQuestion(question.id)}
                      >
                        Remove
                      </button>
                    )}
                  </PageContent>
                  {isLastQuestion && (
                    <button
                      className="add-question-button"
                      type="button"
                      data-dark-text={!dark}
                      onClick={() => handleAddQuestion(goToNext)}
                    >
                      Add Question
                    </button>
                  )}
                </>
              )}
            </Step>
          );
        })}
        <Step index={questions.length + 1}>
          {({ dark }) => (
            <PageContent>
              <div
                className="outcomes"
                onMouseLeave={() => setHoverOutcomeId(undefined)}
              >
                {Object.values(outcomes.outcomes).map((outcome) => (
                  <Outcome
                    key={outcome.id}
                    outcome={outcome}
                    canRemove={canRemoveOutcome(outcome.id)}
                    onMouseOver={setHoverOutcomeId}
                    selectedOutcomeId={hoverOutcomeId || selectedOutcomeId}
                    onClick={setSelectedOutcomeId}
                    onChange={handleOutcomeValueChange}
                    onRemove={handleRemoveOutcome}
                  />
                ))}
                <button
                  type="button"
                  className="add-outcome-button"
                  onClick={handleAddOutcome}
                >
                  Add Outcome
                </button>
              </div>
              <Graph
                info={dimensions}
                dark={!dark}
                onSelectOutcome={setNewOutcomeGrid}
                outcomeGrid={outcomes.grid}
                selectedOutcomeId={hoverOutcomeId || selectedOutcomeId}
              />
            </PageContent>
          )}
        </Step>
      </Steps>
    </div>
  );
}
