import { prisma } from "@/lib/prisma";

export const getPokemonByName = async (name: string) => {
  return prisma.pokemon.findUnique({
    where: {
      name,
    },
  });
};

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

export const getPokemonByType = async (type: string, page: number, limit: number) => {
  const pokemons = await prisma.pokemon.findMany({
    where: {
      types: {
        has: type,
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const nextPageExists = await prisma.pokemon.count({
    where: {
      types: {
        has: type,
      },
    },
    skip: page * limit,
    take: 1,
  });

  const hasNext = nextPageExists > 0;

  return { pokemons, hasNext };
};