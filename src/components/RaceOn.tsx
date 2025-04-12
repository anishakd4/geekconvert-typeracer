import { useTypingStore } from "../stores/useTypingStore.ts";
import RaceTimer from "./RaceTimer.tsx";

const RaceOn = () => {
  const raceCompleted = useTypingStore((state) => state.raceCompleted);
  const raceStartAt = useTypingStore((state) => state.raceStartedAt);
  return (
    <div className="text-2xl flex justify-between">
      <div className="text-race">
        <p>The race is on! Please type the text below:</p>
      </div>

      <div>{!raceCompleted && raceStartAt !== null && <RaceTimer />}</div>
    </div>
  );
};

export default RaceOn;
