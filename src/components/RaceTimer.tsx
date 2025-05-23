import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime.ts";
import { useTypingStore } from "../stores/useTypingStore.ts";

const RaceTimer = () => {
  const minimumTypingSpeed = 20;
  const text = useTypingStore((state) => state.text);
  const [time, setTime] = useState((text.length / 5 / minimumTypingSpeed) * 60);

  useEffect(() => {
    if (time <= 0) {
      useTypingStore.getState().raceOver("timeout");
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
