import { useCallback, useState } from "react";

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [file, setFile] = useState<File>();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (e.target.files?.length && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    },
    [setValue, setFile]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setFile(undefined);
  }, [initialValue, setValue, setFile]);

  return { value, onChange: handleChange, reset, file };
};
