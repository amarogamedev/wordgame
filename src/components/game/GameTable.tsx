import { Grid, GridItem } from "@chakra-ui/react";
import { Cell } from "../../interfaces/cell";

interface GameTableProps {
    cells: Cell[];
    maxCells: number;
    wordSize: number;
}

export const GameTable: React.FC<GameTableProps> = ({ cells, maxCells, wordSize }) => {
    const filledCells = [...cells];

    while (filledCells.length < maxCells) {
        filledCells.push({ character: "" });
    }

    const limitedFilledCells = filledCells.slice(0, maxCells);

    const cellColor = (cell: Cell): string => {
        if (cell.correctPlace) {
            return "themeGreen";
        }
        if (cell.existsInTheWord) {
            return "themeYellow";
        }
        if (cell.typing) {
            return "white";
        }
        return "themeDarkGrey";
    };

    const textColor = (cell: Cell): string => {
        if (cell.typing || cell.existsInTheWord || cell.correctPlace) {
            return "themeDarkGrey";
        } else {
            return "white";
        }
    };

    return (
        <Grid
            templateColumns={"repeat(" + wordSize + ", 1fr)"}
            gap={2}
            width="100%"
            maxWidth="600px"
            margin="0 auto"
        >
            {limitedFilledCells.map((cell, index) => (
                <GridItem
                    key={index}
                    backgroundColor={cellColor(cell)}
                    color={textColor(cell)}
                    fontSize={{ base: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px" }}
                    fontWeight={"black"}
                    width={{ base: "25px", sm: "30px", md: "40px", lg: "50px", xl: "80px" }}
                    height={{ base: "25px", sm: "30px", md: "40px", lg: "50px", xl: "80px" }}
                    aspectRatio={1}
                    borderRadius="md"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderColor={"themeDarkGrey"}
                    borderWidth={1}
                >
                    {cell.character}
                </GridItem>
            ))}
        </Grid>
    );
};