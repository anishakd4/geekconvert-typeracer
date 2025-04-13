import { useState } from "react";
import { Mark, useTypingStore } from "../stores/useTypingStore.ts";

const TextToBeTyped = ({ text }: { text: string }) => {
  const mark = useTypingStore((state) => state.mark);
  return (
    <p style={{ userSelect: "none" }}>
      {text.split("").map((char, i) => {
        return (
          <span className={addMark(i, mark)} key={char + i}>
            {char}
          </span>
        );
      })}
    </p>
  );
};

export default TextToBeTyped;

const addMark = (i: number, mark: Mark): string => {
  const textColor = i < mark.correctlyTyped ? "text-green-500" : "";
  const bgColor =
    i >= mark.correctlyTyped && i < mark.totalCharTyped ? "bg-red-300" : "";

  const cursor =
    i === mark.correctlyTyped ? "animate-cursor" : "border-transparent";

  return `border-l ${textColor} ${bgColor} ${cursor}`;
};
