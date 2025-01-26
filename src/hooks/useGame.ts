import { useState, useEffect } from "react";
import { Cell } from "../interfaces/cell";
import { useToast } from "@chakra-ui/react";

export const useGame = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [gameEnded, setGameEnded] = useState(false);
    const wordSize = 5;
    const columns = 8;
    const maxCells = wordSize * columns;
    const correctWord = "REACT";
    const toast = useToast();

    const addCell = (character: string) => {
        setCells((prevCells) => {
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

            if (newCells.length % wordSize === 0) {
                checkWord(newCells, newCells.length === maxCells);
            }

            return newCells;
        });
    };

    function checkWord(newCells: Cell[], lastChance: boolean) {
        const currentWord = newCells.slice(-wordSize).map(cell => cell.character).join('');
        const wordExists = true; //TODO implementar a verificação se a palavra existe

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
            ...(wordExists ? updatedCells : [])
        ]);

        if(currentWord === correctWord) {
            win();
        }
        else if(lastChance) {
            lose();
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
        if(gameEnded) {
            return;
        }

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
    }, [gameEnded]);

    function lose() {
        setGameEnded(true);
        toast({
            title: "Você perdeu!",
            description: "Suas tentativas acabaram :(",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }

    function win() {
        setGameEnded(true);
        toast({
            title: "Você venceu!",
            description: "Parabéns, você acertou a palavra!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }

    return {
        cells,
        maxCells,
        wordSize
    };
};
