import { prisma } from "@/lib/prisma";

/**
 * Fetches multiple Pokémon by their names with pagination support.
 * 
 * @param {string[]} names - An array of Pokémon names to fetch.
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of items per page.
 * @returns {Promise<Object>} The response object containing Pokémon data and pagination information.
 * @returns {Object[]} returns.pokemons - An array of Pokémon objects.
 * @returns {boolean} returns.hasNext - A boolean indicating if there are more Pokémon available.
 */


export const getPokemonByNames = async (names: string[], page: number, limit: number) => {
  const pokemons = await prisma.pokemon.findMany({
    where: {
      name: {
        in: names,
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const nextPageExists = await prisma.pokemon.count({
    where: {
      name: {
        in: names,
      },
    },
    skip: page * limit,
    take: 1,
  });

  const hasNext = nextPageExists > 0;

  return { pokemons, hasNext };
};