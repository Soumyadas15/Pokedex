"use client"

import { PokedexTable } from "@/components/part2/PokedexTable";
import { Pokemon } from "@prisma/client"
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Container } from "@/components/Container";
import { PokemonTypeSelection } from "./PokemonTypeSelection";
import { EmptyState } from "@/components/EmptyState";

interface FilterablePokedexTableProps{
    pokemons: Pokemon[];
    hasNext: boolean;
}

export const FilterablePokedexTable: React.FC<FilterablePokedexTableProps> = ({
    pokemons,
    hasNext
}) => {
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [searchName, setSearchName] = useState<string | undefined>(undefined);

    const handleTypeChange = (type: string | undefined) => {
        setSelectedType(type);
    };

    return (
        <div>
            <PokemonTypeSelection 
                selectedType={selectedType} 
                selectType={handleTypeChange}
                hasNext={hasNext}
            />
            {pokemons && pokemons.length > 0 ? (
                <PokedexTable pokemons={pokemons} />
            ) : (
                <Container>
                <div className="mt-10 w-full flex items-center justify-center">
                    <EmptyState label="No Pokemon Found"/>
                </div>
                </Container>
            )}
        </div>
    )
}