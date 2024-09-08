import React from "react";
import { Pokemon } from "@prisma/client";
import { Container } from "../Container";
import { Box } from "@mui/material";
import { PokemonRow } from "../ui/PokemonRow";
import { EmptyState } from "../EmptyState";

interface HomeClientProps {
  pokemons: Pokemon[];
}

export const HomeClient: React.FC<HomeClientProps> = ({ pokemons }) => {
  return (
    <Container className="">
      <Box 
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        {pokemons.map((pokemon) => (
          <Box
            key={pokemon?.id} 
            width={{ xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
          >
            <PokemonRow pokemon={pokemon} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};