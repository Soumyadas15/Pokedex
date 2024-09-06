import { prisma } from "@/lib/prisma";

/**
 * Fetches all Pokémon with pagination support.
 * 
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of items per page.
 * @returns {Promise<Object>} The response object containing Pokémon data and pagination information.
 * @returns {Object[]} returns.pokemons - An array of Pokémon objects.
 * @returns {boolean} returns.hasNext - A boolean indicating if there are more Pokémon available.
 */


export const getAllPokemon = async (page: number, limit: number) => {
  const pokemons = await prisma.pokemon.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const nextPageExists = await prisma.pokemon.count({
    skip: page * limit,
    take: 1,
  });

  const hasNext = nextPageExists > 0;

  return { pokemons, hasNext };
};