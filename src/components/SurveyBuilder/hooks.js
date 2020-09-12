import { useState } from "react";

export function useInputValue(initial) {
  const [value, setValue] = useState(initial);
  const handleChangeValue = e => setValue(e.target.value);
  return [value, handleChangeValue];
}

export function useFileValue(initial) {
  const [value, setValue] = useState(initial);
  const handleChangeValue = e => setValue(e);
  return [value, handleChangeValue];
}
