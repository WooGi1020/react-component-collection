import { useEffect, useState } from "react";

export default function useEventKeeper(
  ref: React.RefObject<HTMLElement | null>,
  event: string,
  delay = 150
) {
  const [isEventing, setIsEventing] = useState(false);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const container = ref?.current;
    if (!container) return;

    const keepEventing = () => {
      if (!isEventing) setIsEventing(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsEventing(false), delay);
    };

    container.addEventListener(event, keepEventing);
    return () => {
      container.removeEventListener(event, keepEventing);
      clearTimeout(scrollTimeout);
    };
  }, [ref, event, delay]);

  return isEventing;
}
