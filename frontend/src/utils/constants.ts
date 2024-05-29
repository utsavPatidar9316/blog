import { useEffect, useState } from "react";
import { HandleControls } from "../types/common";

export const defaultControls: HandleControls = {
  search: "",
  sortOrder: "desc",
};

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
