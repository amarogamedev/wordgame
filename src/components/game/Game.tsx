import { Box, Button } from '@chakra-ui/react'
import { GameTable } from "./GameTable";
import { useGame } from "../../hooks/useGame";
import { ModalBemVindo } from '../ModalBemVindo';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useState } from 'react';

export const Game = () => {
    const [key, setKey] = useState(0);
    const { cells, maxCells, wordSize, resetGame } = useGame();

    return (
        <>
            <Box p={8} justifyItems={"center"} key={key}>
                <GameTable cells={cells} maxCells={maxCells} wordSize={wordSize} />
            </Box>
            <Button  onClick={resetGame} leftIcon={<ArrowsClockwise size={24} color='themeDarkGrey'/>}>
                Pick another word
            </Button>
            <ModalBemVindo/>
        </>
    )
}