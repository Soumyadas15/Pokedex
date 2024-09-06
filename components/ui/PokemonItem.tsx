"use client";

import { Pokemon } from "@prisma/client";
import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  useTheme, 
  Chip, 
  Box 
} from "@mui/material";

interface PokemonItemProps {
  pokemon: Pokemon;
}

export const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "fire":
        return "#F08030";
      case "water":
        return "#6890F0";
      case "grass":
        return "#78C850";
      case "electric":
        return "#F8D030";
      case "psychic":
        return "#F85888";
      case "ice":
        return "#98D8D8";
      case "dragon":
        return "#7038F8";
      
      default:
        return "#A8A878";
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: isDarkMode ? "#181818" : "#F9F9F9",
        color: isDarkMode ? theme.palette.common.white : theme.palette.common.black,
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
        transition: "background-color 0.5s ease, color 0.3s ease",
      }}
      elevation={0}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <CardMedia
            component="img"
            image={pokemon.sprite || "/default-image.png"}
            alt={pokemon.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {pokemon.id}. {pokemon.name}
        </Typography>

        <Box sx={{ marginTop: "0.5rem", display: 'flex', gap: "0.5rem", flexWrap: 'wrap' }}>
          {pokemon.types.map((type) => (
            <Chip
              key={type}
              label={type}
              sx={{
                backgroundColor: getTypeColor(type),
                color: theme.palette.common.white,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};