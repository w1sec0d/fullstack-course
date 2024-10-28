import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue();
  };

  const properties = {
    type,
    value,
    onChange,
  };

  return {
    properties,
    reset,
  };
};
