import { FullResult } from "../stores/useTypingStore.ts";
import { formatTime } from "../utils/formatTime.ts";

const ShowResult = ({ result }: { result: FullResult }) => {
  const { speed, accuracy, time, mistakeWords } = result;

  return (
    <div className="flex gap-10 items-start">
      <div className="flex-1 grid grid-cols-2 gap-4">
        <p>Your speed:</p>
        <p>{speed}</p>
        <p>Your accuracy:</p>
        <p>{accuracy}</p>
        <p>Time:</p>
        <p>{formatTime(time)}</p>
      </div>
      <div className="flex-1">
        <h5 className="underline font-semibold text-xl mb-2">Mistake words</h5>
      </div>
      <div className="grid grid-cols-2 gap-1 items-start">
        {mistakeWords.map((word, index) => (
          <p key={word + index} className="text-red-300 text-lg">
            {word}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ShowResult;
