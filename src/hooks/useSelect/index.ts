import React, { useState } from "react";

type Params = {
  list: any[];
  placeHolder: string;
  text?: any[];
  initialIndex?: number;
  isMultiple?: boolean;
};

export const useSelect = ({
  list,
  text,
  initialIndex,
  isMultiple,
  placeHolder,
}: Params) => {
  const [selectedIndex, setSelectedIndex] = useState(
    isMultiple ? [initialIndex] : initialIndex
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isMultiple) {
      setSelectedIndex((prev: any[]) => [
        ...prev,
        list.indexOf(event.target.value),
      ]);
      return;
    }
    setSelectedIndex(list.indexOf(event.target.value));
  };

  const getMutipleValue = (indexs: (number | undefined)[]) => {
    return list.filter((_, index) => indexs.includes(index));
  };

  const getValue = (index: number | (number | undefined)[] | undefined) => {
    if (!index && index !== 0) {
      return;
    }
    if (typeof index === "number") {
      return list[index];
    }
    return getMutipleValue(index);
  };

  return {
    items: list,
    onChange: handleChange,
    value: getValue(selectedIndex),
    text,
    placeHolder,
    multiple: isMultiple,
  };
};
