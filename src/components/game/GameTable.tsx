import { Grid, GridItem } from "@chakra-ui/react";
import { Cell } from "../../interfaces/cell";

interface GameTableProps {
  letters: Cell[];
}

export const GameTable: React.FC<GameTableProps> = ({ letters }) => {
  const totalCells = 40;
  const filledLetters = [...letters];

  while (filledLetters.length < totalCells) {
    filledLetters.push({ character: null });
  }

  const limitedFilledLetters = filledLetters.slice(0, totalCells);

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={2}
      width="100%"
      maxWidth="600px"
      margin="0 auto"
    >
      {limitedFilledLetters.map((letter, index) => (
        <GridItem
          key={index}
          backgroundColor={letter.character == null ? "themeDarkGreen" : "themeLightGreen"}
          color={"themeDarkGreen"}
          fontSize={{ base: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px" }}
          fontWeight={"black"}
          width={{ base: "25px", sm: "30px", md: "40px", lg: "50px", xl: "80px" }}
          height={{ base: "25px", sm: "30px", md: "40px", lg: "50px", xl: "80px" }}
          aspectRatio={1}
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {letter.character}
        </GridItem>
      ))}
    </Grid>
  );
};