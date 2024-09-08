import { HomeClient } from "@/components/home/HomeClient";
import { Search } from "@/components/Search";
import { serverClient } from "../../_trpc/serverClient";
import { Container } from "@/components/Container";
import { Typography } from "@mui/material";
import { EmptyState } from "@/components/EmptyState";

const ITEMS_PER_PAGE = 4;

interface SearchParams {
  name?: string;
  page?: string;
}

export default async function Home({
  searchParams: { name = '', page },
}: {
  searchParams: SearchParams;
}) {
  const searchTerm = decodeURIComponent(name).trim();
  const currentPage = Number(page) || 1;

  const { pokemons, hasNext } = await serverClient.getPokemonRouter.getPokemon({
    name: searchTerm,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  console.log('Home', pokemons)

  return (
    <div className="pb-[3vw]">
      <Search placeholder="Search.." hasNext={hasNext} />
      {pokemons && pokemons.length > 0 ? (
        <HomeClient pokemons={pokemons} />
      ) : (
        <Container>
          <div className="mt-10 w-full flex items-center justify-center z">
            <EmptyState label="No Pokemon Found"/>
          </div>
        </Container>
      )}
    </div>
  );
}