import { atom } from "jotai";

export const resultsAtom = atom<{ [questionId: string]: Result }>({});
