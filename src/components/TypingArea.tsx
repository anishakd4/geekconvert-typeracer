import { useState } from "react";
import TextInput from "./TextInput.tsx";
import { useTypingStore } from "../stores/useTypingStore.ts";
import TextToBeTyped from "./TextToBeTyped.tsx";

const TypingArea = () => {
  const text = useTypingStore((state) => state.text);
  return (
    <div className="bg-lightGray space-y-4 px-2 py-5 border border-gray-300 rounded-md text-xl font-mono font-light">
      <div>
        <TextToBeTyped text={text} />
      </div>
      <div>
        <TextInput text={text} />
      </div>
    </div>
  );
};

export default TypingArea;
