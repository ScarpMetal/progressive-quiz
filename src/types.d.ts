type QuestionId = string;

interface Question {
  id: QuestionId;
  text: string;
  disagree: number[];
  agree: number[];
}

type Result = 0 | 1 | 2 | 3 | 4 | 5;

type OutcomeId = string;
type OutcomeGrid = OutcomeId[][];
type Outcome = {
  id: OutcomeId;
  text: string;
  subtext: string;
};
type Outcomes = {
  grid: OutcomeGrid;
  outcomes: {
    [key: OutcomeId]: Outcome;
  };
};
