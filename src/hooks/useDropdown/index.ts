import { useCallback, useEffect, useRef, useState } from "react";

const ESC_KEY = "Escape";

const onEscapeKeyPress = (fn: () => void) => ({ code }: KeyboardEvent) =>
  code === ESC_KEY ? fn() : null;

export const useDropdown = <T extends Element>() => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<T>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleGlobalMouseDown = ({ target }: MouseEvent) => {
      if (!ref.current || ref.current.contains(target as Element)) {
        return;
      }

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
