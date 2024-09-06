import { router } from "./trpc";
import { getPokemonRouter } from "./getPokemon";
import { getPokemonByTypeRouter } from "./getPokemonByType";

export const appRouter = router({
  getPokemonRouter,
  getPokemonByTypeRouter,
});

export type AppRouter = typeof appRouter;