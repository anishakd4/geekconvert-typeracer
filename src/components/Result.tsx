import { useTypingStore } from "../stores/useTypingStore.ts";
import ShowResult from "./ShowResult.tsx";

const Result = () => {
  const result = useTypingStore((state) => state.result);
  return (
    <div className="space-y-4">
      <button
        onClick={() => useTypingStore.getState().startNewRace()}
        className="bg-greenA hover:bg-greenB px-8 py-2 text-white rounded-lg"
      >
        New Race
      </button>

      <div className="bg-result p-6 rounded-md text-gray-200">
        <h3 className="text-2xl font-bold pb-3 mb-3 border-b border-gray-500">
          Result
        </h3>
        {result.state !== "completed" ? (
          <p>{result.message}</p>
        ) : (
          <ShowResult result={result} />
        )}
      </div>
    </div>
  );
};

export default Result;
