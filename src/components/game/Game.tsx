import { Box } from "@chakra-ui/react";
import { GameTable } from "./GameTable";
import { useGame } from "../../hooks/useGame";

export const Game = () => {
    const { cells, maxCells, wordSize } = useGame();

    return (
        <Box p={8} justifyItems={"center"}>
            <GameTable cells={cells} maxCells={maxCells} wordSize={wordSize} />
        </Box>
    )
}