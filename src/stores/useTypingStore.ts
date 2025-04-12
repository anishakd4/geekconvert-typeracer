import { create } from "zustand";
import textData from "../assets/data/textData.ts";
import getText from "../utils/getText.ts";

export type Mark = { correctlyTyped: number; totalCharTyped: number };

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
  raceOver: () => void;
  startNewRace: () => void;
  updateCorrectMark: (totalCharTyped: number) => void;
  updateIncorrectMark: (totalCharTyped: number) => void;
};

export const useTypingStore = create<TypingStore>()((set, get) => ({
  text: getText(textData),
  raceCompleted: false,
  mark: { correctlyTyped: 0, totalCharTyped: 0 },
  raceOver: () => set({ raceCompleted: true }),
  raceStartedAt: null,
  completePercentage: 0,
  currentSpeed: "0 wpm",
  setRaceStartAt: () => set({ raceStartedAt: Date.now() }),
  startNewRace: () =>
    set({
      text: getText(textData),
      raceCompleted: false,
      raceStartedAt: null,
      mark: { correctlyTyped: 0, totalCharTyped: 0 },
      completePercentage: 0,
      currentSpeed: "0 wpm",
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
}));
