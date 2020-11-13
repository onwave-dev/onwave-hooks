import { useCallback, useEffect, useRef, useState } from "react";

const ESC_KEY = 27;

const onEscapeKeyPress = (fn: () => void) => ({ keyCode }: KeyboardEvent) =>
  keyCode === ESC_KEY ? fn() : null;

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleGlobalMouseDown = ({ target }: MouseEvent) => {
      if (
        !ref.current ||
        ((ref.current as unknown) as Element).contains(target as Element)
      ) {
        console.log("false");
        return;
      }
      console.log("close");

      close();
    };

    const handleGlobalKeydown = onEscapeKeyPress(close);

    document.addEventListener("mousedown", handleGlobalMouseDown);
    document.addEventListener("keydown", handleGlobalKeydown);

    return () => {
      document.removeEventListener("mousedown", handleGlobalMouseDown);
      document.removeEventListener("keydown", handleGlobalKeydown);
    };
  }, [close]);

  return { ref, isOpen, open, close };
};
