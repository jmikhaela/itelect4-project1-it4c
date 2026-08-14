import { useEffect, useRef } from "react";

function usePrevious<T>(value: T): T | undefined {
  const previousValue = useRef<T | undefined>(undefined);

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
}

export default usePrevious;