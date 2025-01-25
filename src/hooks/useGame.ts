import { useState, useEffect } from "react";
import { Cell } from "../interfaces/cell";

export const useGame = () => {
  const [letters, setLetters] = useState<Cell[]>([]);

  const addLetter = (character: string) => {
    const letter = {
      character: character,
      selected: false,
      correctPlace: false,
      existsInTheWord: false
    };
    setLetters((prevLetters) => [...prevLetters, letter]);
  };

  const resetLetters = () => {
    setLetters([]);
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(event.key)) {
        addLetter(event.key.toLocaleUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return {
    letters,
    addLetter,
    resetLetters,
  };
};
