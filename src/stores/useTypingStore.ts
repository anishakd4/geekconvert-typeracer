import { create } from "zustand";
import textData from "../assets/data/textData.ts";
import getText from "../utils/getText.ts";

export type Mark = { correctlyTyped: number; totalCharTyped: number };

export type FullResult = {
  state: "completed";
  speed: string;
  accuracy: string;
  time: number;
  mistakeWords: TypingStore["mistakeWords"];
};

type Result =
  | {
      state: "timeout" | "error";
      message: string;
    }
  | FullResult;

type TypingStore = {
  text: string;
  raceCompleted: boolean;
  mark: Mark;
  raceStartedAt: null | number;
  setRaceStartAt: () => void;
  completePercentage: number;
  currentSpeed: string;
  setCompletePercentage: (percent: number) => void;
  setCurrentSpeed: () => void;
  result: Result;
  mistakeWords: string[];
  raceOver: (resultState: Result["state"]) => void;
  startNewRace: () => void;
  updateCorrectMark: (totalCharTyped: number) => void;
  updateIncorrectMark: (totalCharTyped: number) => void;
  getResult: (resultState: Result["state"]) => Result;
  updateMistakeWords: (words: string) => void;
};

const initialState = {
  raceCompleted: false,
  mark: { correctlyTyped: 0, totalCharTyped: 0 },
  raceStartedAt: null,
  completePercentage: 0,
  currentSpeed: "0 wpm",
  mistakeWords: [],
  result: {
    state: "error",
    message: "Something went wrong, please type again",
  } as Result,
};

export const useTypingStore = create<TypingStore>()((set, get) => ({
  ...initialState,
  text: getText(textData),
  raceOver: (state) =>
    set({ raceCompleted: true, result: get().getResult(state) }),
  setRaceStartAt: () => set({ raceStartedAt: Date.now() }),
  startNewRace: () =>
    set({
      ...initialState,
      text: getText(textData),
    }),
  updateCorrectMark: (totalCharTyped) =>
    set({ mark: { correctlyTyped: totalCharTyped, totalCharTyped } }),
  updateIncorrectMark: (totalCharTyped) =>
    set((state) => ({
      mark: { ...state.mark, totalCharTyped },
    })),
  setCompletePercentage: (percent) => set({ completePercentage: percent }),
  setCurrentSpeed: () => {
    const startTime = get().raceStartedAt;
    if (startTime === null) {
      return;
    }

    const minutes = (Date.now() - startTime) / 1000 / 60;
    const words = get().mark.correctlyTyped / 5;
    const speed = Math.round(words / minutes);
    set({ currentSpeed: `${speed} wpm` });
  },
  getResult: (resultState) => {
    const raceStartAt = get().raceStartedAt;
    const raceEndAt = Date.now();
    if (resultState === "timeout") {
      return { state: "timeout", message: "Time out!" };
    }

    if (resultState === "error" || raceStartAt === null) {
      return initialState.result;
    }

    const seconds = (raceEndAt - raceStartAt) / 1000;
    const words = get().text.length / 5;
    const speed = Math.round(words / (seconds / 60));
    const accuracy = 100 - (get().mistakeWords.length / words) * 100;

    return {
      state: "completed",
      speed: `${speed} wpm`,
      accuracy: `${accuracy.toFixed(2)}%`,
      time: seconds,
      mistakeWords: get().mistakeWords,
    };
  },
  updateMistakeWords: (word) =>
    set((state) => ({ mistakeWords: [...state.mistakeWords, word] })),
}));
