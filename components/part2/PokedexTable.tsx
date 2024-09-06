import React from "react";
import { Pokemon } from "@prisma/client";
import { Container } from "../Container";
import { Grid } from "@mui/material";
import { PokemonItem } from "../ui/PokemonItem";

interface PokedexTableProps {
    pokemons: Pokemon[];
}

export const PokedexTable: React.FC<PokedexTableProps> = ({ pokemons }) => {
    return (
        <Container>
            <Grid container spacing={3}>
                {pokemons.map((pokemon) => (
                    <Grid item xs={6} sm={6} md={6} lg={3} key={pokemon.id}>
                        <PokemonItem pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};