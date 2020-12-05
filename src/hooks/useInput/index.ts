import { useState } from "react";

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [file, setFile] = useState<File>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.files?.length && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const reset = () => {
    setValue(initialValue);
  };

  return { value, onChange: handleChange, reset, file };
};
