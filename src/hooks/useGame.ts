import { useState, useEffect } from "react";
import { Cell } from "../interfaces/cell";
import { useToast } from "@chakra-ui/react";
import { useWords } from "./useWords";

export const useGame = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [gameEnded, setGameEnded] = useState(false);
    const { correctWord, wordSize, maxCells, wordIsValid } = useWords();
    
    const toast = useToast();

    const addCellSound = new Audio("/sounds/addCell.mp3");

    const addCell = (character: string) => {
        if (gameEnded) {
            return;
        }

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

        addCellSound.play();
    };

    function checkWord(newCells: Cell[], lastChance: boolean): void {
        const enteredWord = newCells.slice(-wordSize).map(cell => cell.character).join('');
        
        if (!wordIsValid(enteredWord)) {
            setCells(prevCells => [...prevCells.slice(0, -wordSize)]);
            return invalidWord();
        }
        
        const correctLetterFrequency: Record<string, number> = {};
        for (const letter of correctWord) {
            correctLetterFrequency[letter] = (correctLetterFrequency[letter] || 0) + 1;
        }
        
        const matchedLetterCount: Record<string, number> = {};
        const updatedCells = newCells.slice(-wordSize).map((cell, index) => {
            const isCorrectPosition = cell.character === correctWord[index];
            
            matchedLetterCount[cell.character] = (matchedLetterCount[cell.character] || 0) + Number(isCorrectPosition);
            
            return {
                ...cell,
                correctPlace: isCorrectPosition,
                existsInTheWord: isCorrectPosition,
                typing: false
            };
        });
        
        updatedCells.forEach(cell => {
            const stillAvailable = (matchedLetterCount[cell.character] || 0) < correctLetterFrequency[cell.character];
            if (!cell.correctPlace && correctWord.includes(cell.character) && stillAvailable) {
                cell.existsInTheWord = true;
                matchedLetterCount[cell.character] = (matchedLetterCount[cell.character] || 0) + 1;
            }
        });
    
        setCells(prevCells => [...prevCells.slice(0, -wordSize), ...updatedCells]);
        
        if (enteredWord === correctWord) return win();
        if (lastChance) return lose();
    }

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

    function lose() {
        setGameEnded(true);
        toast({
            title: "You lose!",
            description: "The word was: " + correctWord,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }

    function win() {
        setGameEnded(true);
        toast({
            title: "You win!",
            description: "Congratulations! You found the word! To play again simply refresh the page",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }

    function invalidWord() {
        toast({
            title: "Invalid word!",
            description: "This word does not exist in our dictionary",
            status: "warning",
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
