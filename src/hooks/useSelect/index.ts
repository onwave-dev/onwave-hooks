import React, { useState } from "react";

export const useSelect = (
  items: { value: number; text: string }[],
  initialValue?: number,
  placeHolder?: string
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(Number(e.target.value));
  };

  return {
    value,
    onChange: handleChange,
    items,
    placeHolder,
  };
};
