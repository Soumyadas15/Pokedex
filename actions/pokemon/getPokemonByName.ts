import { prisma } from "@/lib/prisma";

/**
 * Fetches a single Pokémon by its name.
 * 
 * @param {string} name - The name of the Pokémon to fetch.
 * @returns {Promise<Object|null>} The Pokémon object if found, otherwise null.
 */

export const getPokemonByName = async (name: string) => {
  return prisma.pokemon.findUnique({
    where: {
      name,
    },
  });
};