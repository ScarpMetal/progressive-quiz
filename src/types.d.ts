type QuestionId = string;

interface BaseQuestion {
  text: string;
  disagree: number[];
  agree: number[];
}

interface Question extends BaseQuestion {
  id: QuestionId;
  nextId: QuestionId | null;
  prevId: QuestionId | null;
}

type Result = 0 | 1 | 2 | 3 | 4 | 5;
