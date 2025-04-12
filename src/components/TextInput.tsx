import useTypingInput from "../hooks/useTypingInput.ts";
import { useTypingStore } from "../stores/useTypingStore.ts";

const TextInput = ({ text }: { text: string }) => {
  const { typed, setTyped, raceComplete, error } = useTypingInput({
    words: text.split(" "),
  });
  const raceStartAt = useTypingStore((state) => state.raceStartedAt);

  const startRace = (e) => {
    if (raceStartAt === null) {
      useTypingStore.getState().setRaceStartAt();
    }
    setTyped(e.target.value);
  };

  return (
    <input
      value={typed}
      onChange={startRace}
      autoFocus
      disabled={raceComplete}
      onPaste={(e) => e.preventDefault()}
      className={`w-full border border-gray-200 rounded-sm p-[2px] text-lg focus:outline-none focus:border-black ${
        error ? "bg-red-300" : "bg-white"
      }`}
      type="text"
    />
  );
};

export default TextInput;
