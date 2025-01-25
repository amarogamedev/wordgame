import { useState, useEffect } from "react";
import { Cell } from "../interfaces/cell";

export const useGame = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const wordSize = 5;
    const columns = 8;
    const maxCells = wordSize * columns;
    const correctWord = "REACT";

    const addCell = (character: string) => {
        setCells((prevCells) => {
            if (prevCells.length > (maxCells - 1)) {
                return prevCells;
            }

            const newCells = [
                ...prevCells,
                {
                    character: character,
                    typing: true,
                    selected: false,
                    correctPlace: false,
                    existsInTheWord: false,
                },
            ];

            if (newCells.length % 5 === 0) {
                checkWord(newCells);
            }

            return newCells;
        });
    };

    function checkWord(newCells: Cell[]) {
        const currentWord = newCells.slice(-wordSize).map(cell => cell.character).join('');
        const updatedCells = newCells.slice(-wordSize).map((cell, index) => {
            const correctPlace = cell.character === correctWord[index];
            const existsInTheWord = correctWord.includes(cell.character);
            return {
                ...cell,
                correctPlace,
                existsInTheWord,
                typing: false
            };
        });

        setCells(prevCells => [
            ...prevCells.slice(0, -wordSize),
            ...updatedCells
        ]);

        if(currentWord === correctWord) {
            console.log('You won!'); //TODO melhorar isso
        }
    };

    const removeLastCharacter = () => {
        setCells((prevCells) => {
            const lastCellIndex = prevCells.length - 1;
            if (lastCellIndex >= 0 && prevCells[lastCellIndex].typing) {
                return prevCells.slice(0, -1);
            }
            return prevCells;
        });
    };

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (/^[a-zA-Z]$/.test(event.key)) {
                addCell(event.key.toLocaleUpperCase());
            } else if (event.key === "Backspace") {
                removeLastCharacter();
            }
        };

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, []);

    return {
        cells,
        maxCells,
        wordSize
    };
};
