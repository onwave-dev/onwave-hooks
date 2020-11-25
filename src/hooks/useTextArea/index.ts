import { useState } from "react";

export const useTextArea = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange };
};
