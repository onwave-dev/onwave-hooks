import { useCallback, useState } from "react";

export const useTextArea = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [setValue, initialValue]);

  return { value, onChange: handleChange, reset };
};
