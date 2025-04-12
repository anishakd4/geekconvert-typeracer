import { useTypingStore } from "../stores/useTypingStore.ts";

const CurrentSpeed = () => {
  const currentSpeed = useTypingStore((state) => state.currentSpeed);
  return <p>{currentSpeed}</p>;
};

export default CurrentSpeed;
