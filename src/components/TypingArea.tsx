import { useState } from "react";
import TextInput from "./TextInput.tsx";
import { useTypingStore } from "../stores/useTypingStore.ts";
import TextToBeTyped from "./TextToBeTyped.tsx";
import ArrowButton from "./ArrowButton.tsx";

const TypingArea = () => {
  const text = useTypingStore((state) => state.text);
  return (
    <div className="bg-lightGray space-y-4 px-2 py-5 border border-gray-300 rounded-md text-xl font-mono font-light">
      <div className="relative">
        <ArrowButton className="absolute top-0 -left-40 animate-scaling">
          type this
        </ArrowButton>
        <TextToBeTyped text={text} />
      </div>
      <div className="relative">
        <ArrowButton className="absolute top-0 -left-40 animate-scaling">
          here
        </ArrowButton>
        <TextInput text={text} />
      </div>
    </div>
  );
};

export default TypingArea;
