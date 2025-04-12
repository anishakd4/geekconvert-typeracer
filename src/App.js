import "./App.css";
import RaceTrack from "./components/RaceTrack.tsx";
import TypingArea from "./components/TypingArea.tsx";
import RaceOn from "./components/RaceOn.tsx";
import { useTypingStore } from "./stores/useTypingStore.ts";
import Result from "./components/Result.tsx";

function App() {
  const raceCompleted = useTypingStore((state) => state.raceCompleted);

  return (
    <div className="bg-lightGray grid justify-center items-start pt-20 min-h-screen">
      <div className="w-[800px] p-10 space-y-6 rounded-md bg-white drop-shadow-x1">
        <RaceOn />

        <RaceTrack />

        {!raceCompleted ? <TypingArea /> : <Result />}
      </div>
    </div>
  );
}

export default App;
