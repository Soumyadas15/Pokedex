/**
 * @fileOverview This file defines the `getPokemonByTypeRouter` which provides a procedure to fetch Pokémon data by type or all Pokémon with pagination support.
 * 
 * The router includes a single procedure: `getPokemonByType`.
 * 
 * The procedure uses `trpc` for the procedure definition and `zod` for input validation. Caching is utilized to improve performance.
 */

import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { getAllPokemon } from "@/actions/pokemon/getAllPokemon";
import { getPokemonByType } from "@/actions/pokemon/getPokemonByType";
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
 * @param {string} type - The type of request (e.g., "type", "all").
 * @param {Record<string, any>} params - The query parameters to include in the cache key.
 * @returns {string} The generated cache key.
 */
const getCacheKey = (type: string, params: Record<string, any>): string => {
  const queryParams = new URLSearchParams(params).toString();
  return `pokemon:${type}:${queryParams}`;
};

/**
 * Defines the `getPokemonByTypeRouter` which provides a procedure to fetch Pokémon data by type or all Pokémon.
 * 
 * The procedure supports the following scenarios:
 * - Fetch Pokémon by type with pagination support.
 * - Fetch all Pokémon with pagination support if type is not provided.
 * 
 * The procedure uses caching to avoid redundant requests and improve performance.
 * 
 * @type {import('./trpc').Router}
 */
export const getPokemonByTypeRouter = router({
  /**
   * Procedure to fetch Pokémon data based on input parameters.
   * 
   * @param {Object} input - The input parameters for the query.
   * @param {string} [input.type] - The type of Pokémon to fetch.
   * @param {number} [input.page=1] - The page number for pagination.
   * @param {number} [input.limit=10] - The number of items per page.
   * @returns {Promise<Object>} The response object containing Pokémon data and pagination information.
   * @returns {Object[]} returns.pokemons - An array of Pokémon data.
   * @returns {boolean} returns.hasNext - A boolean indicating if there are more Pokémon available.
   */
  getPokemonByType: publicProcedure
    .input(z.object({
      type: z.string().optional(),
      ...paginationSchema.shape,
    }))
    .query(async ({ input }) => {
      const { type, page = 1, limit = 10 } = input;

      // Fetch Pokémon by type
      if (type) {
        const cacheKey = getCacheKey("type", { type, page, limit });
        const cachedPokemons = await getCachedPokemon(cacheKey);
        if (cachedPokemons) {
          return cachedPokemons;
        }

        const paginatedPokemons = await getPokemonByType(type, page, limit);
        await setCachedPokemon(cacheKey, paginatedPokemons);
        return paginatedPokemons;
      }

      // Fetch all Pokémon with pagination
      const cacheKey = getCacheKey("all", { page, limit });
      const cachedPokemons = await getCachedPokemon(cacheKey);
      if (cachedPokemons) {
        return cachedPokemons;
      }

      const paginatedPokemons = await getAllPokemon(page, limit);
      await setCachedPokemon(cacheKey, paginatedPokemons);
      return paginatedPokemons;
    }),
});