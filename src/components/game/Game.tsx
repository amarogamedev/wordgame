import { Box, Button } from "@chakra-ui/react";
import { GameTable } from "./GameTable";
import { useGame } from "../../hooks/useGame";

export const Game = () => {
    const { letters, resetLetters } = useGame();

    return (
        <Box p={8} justifyItems={"center"}>
            <GameTable letters={letters} />
            <Button onClick={resetLetters} m={4}>Reset Letters</Button>
        </Box>
    )
}