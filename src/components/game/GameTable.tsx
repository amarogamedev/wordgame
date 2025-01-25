import { Grid, GridItem } from "@chakra-ui/react";

export const GameTable = () => (
  <Grid
    templateColumns="repeat(5, 1fr)"
    gap={2}
    width="100%"
    maxWidth="600px"
    margin="0 auto"
  >
    {[...Array(40)].map((_, index) => (
      <GridItem
        key={index}
        backgroundColor="grey"
        width={{ base: "25px", sm: "30px", md: "40px", lg: "50px", xl: "80px" }}
        height={{ base: "25px", sm: "30px", md: "40px", lg: "50px", xl: "80px" }}
        aspectRatio={1}
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {index + 1}
      </GridItem>
    ))}
  </Grid>
);
