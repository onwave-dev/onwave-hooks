import React, { useState } from "react";

export const useSelect = (
  items: { value: any; text: string }[],
  initialValue?: any,
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
