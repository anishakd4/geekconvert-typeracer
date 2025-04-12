import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime.ts";
import { useTypingStore } from "../stores/useTypingStore.ts";

const RaceTimer = () => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (time <= 0) {
      useTypingStore.getState().raceOver();
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      if (time % 3 === 0) {
        useTypingStore.getState().setCurrentSpeed();
      }
    }, 1000);

    return () => clearInterval(interval);
  });
  return <p>{formatTime(time)}</p>;
};

export default RaceTimer;
