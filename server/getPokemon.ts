/**
 * @fileOverview This file defines the `getPokemonRouter` which provides a procedure to fetch Pokémon data.
 * The router utilizes caching and supports pagination.
 * 
 * The router includes a single procedure: `getPokemon`.
 * 
 * The router's functionality is divided into three cases based on the input parameters:
 * - Fetching Pokémon by a single name.
 * - Fetching Pokémon by multiple names.
 * - Fetching all Pokémon with pagination support.
 * 
 * The router uses `trpc` for the procedure definition and `zod` for input validation.
 */

import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { getPokemonByName } from "@/actions/pokemon/getPokemonByName";
import { getAllPokemon } from "@/actions/pokemon/getAllPokemon";
import { getPokemonByNames } from "@/actions/pokemon/getPokemonByNames";
import { getCachedPokemon, setCachedPokemon } from "@/lib/cache";

/**
 * Schema for pagination parameters.
 * 
 * @typedef {Object} PaginationSchema
 * @property {number} [page] - The page number for pagination (defaults to 1 if not provided).
 * @property {number} [limit] - The number of items per page (defaults to 10 if not provided, with a maximum of 100).
 */
const paginationSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});



/**
 * Generates a cache key based on the type of request and query parameters.
 * 
 * @param {string} type - The type of request (e.g., "names", "name", "all").
 * @param {Record<string, any>} params - The query parameters to include in the cache key.
 * @returns {string} The generated cache key.
 */
const getCacheKey = (type: string, params: Record<string, any>): string => {
  const queryParams = new URLSearchParams(params).toString();
  return `pokemon:${type}:${queryParams}`;
};



/**
 * Defines the `getPokemonRouter` which provides a procedure to fetch Pokémon data.
 * 
 * The procedure supports the following scenarios:
 * - Fetch Pokémon by a single name.
 * - Fetch Pokémon by multiple names.
 * - Fetch all Pokémon with pagination support.
 * 
 * The procedure uses caching to avoid redundant requests and improve performance.
 * 
 * @type {import('./trpc').Router}
 */
export const getPokemonRouter = router({
  /**
   * Procedure to fetch Pokémon data based on input parameters.
   * 
   * @param {Object} input - The input parameters for the query.
   * @param {string} [input.name] - The name of a single Pokémon to fetch.
   * @param {string[]} [input.names] - An array of names of Pokémon to fetch.
   * @param {number} [input.page=1] - The page number for pagination.
   * @param {number} [input.limit=10] - The number of items per page.
   * @returns {Promise<Object>} The response object containing Pokémon data and pagination information.
   * @returns {Object[]} returns.pokemons - An array of Pokémon data.
   * @returns {boolean} returns.hasNext - A boolean indicating if there are more Pokémon available.
   */
  getPokemon: publicProcedure
    .input(z.object({
      name: z.string().optional(),
      names: z.array(z.string()).optional(),
      ...paginationSchema.shape,
    }))
    .query(async ({ input }) => {
      const { name, names, page = 1, limit = 10 } = input;

      // Fetch Pokémon by multiple names
      if (names && names.length > 0) {
        const sortedNames = names.slice().sort();
        const cacheKey = getCacheKey("names", { names: sortedNames.join(","), page, limit });
        const cachedPokemons = await getCachedPokemon(cacheKey);
        if (cachedPokemons) {
          return cachedPokemons;
        }

        const { pokemons, hasNext } = await getPokemonByNames(sortedNames, page, limit);
        const response = { pokemons, hasNext };

        if (!pokemons || pokemons.length === 0) {
          return { pokemons: [], hasNext: false };
        }

        await setCachedPokemon(cacheKey, response);
        return response;
      }

      // Fetch Pokémon by a single name
      if (name) {
        const cacheKey = getCacheKey("name", { name: name.toLowerCase() });
        const cachedPokemon = await getCachedPokemon(cacheKey);
        if (cachedPokemon) {
          return { pokemons: [cachedPokemon], hasNext: false };
        }

        const pokemon = await getPokemonByName(name);
        if (!pokemon) {
          return { pokemons: [], hasNext: false };
        }

        const response = { pokemons: [pokemon], hasNext: false };
        await setCachedPokemon(cacheKey, response);
        return response;
      }

      // Fetch all Pokémon with pagination
      const cacheKey = getCacheKey("all", { page, limit });
      const cachedPokemons = await getCachedPokemon(cacheKey);
      if (cachedPokemons) {
        return cachedPokemons;
      }

      const { pokemons, hasNext } = await getAllPokemon(page, limit);
      const response = { pokemons, hasNext };
      await setCachedPokemon(cacheKey, response);
      return response;
    }),
});