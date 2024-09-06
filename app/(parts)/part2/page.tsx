import { Search } from "@/components/home/Search";
import { serverClient } from "../../_trpc/serverClient";
import { Container } from "@/components/Container";
import { Typography } from "@mui/material";
import { PokedexTable } from "@/components/part2/PokedexTable";
import { EmptyState } from "@/components/EmptyState";

const ITEMS_PER_PAGE = 4;

interface SearchParams {
  name?: string;
  page?: string;
}

export default async function PartTwo({
  searchParams: { name, page },
}: {
  searchParams: SearchParams;
}) {
  const currentPage = Number(page) || 1;

  const searchNames = name
    ? decodeURIComponent(name).split(",").map((n) => n.trim())
    : undefined;

 const { pokemons, hasNext } = await serverClient.getPokemonRouter.getPokemon({
    names: searchNames,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  return (
    <div className="pb-[3vw]">
      <Search 
        placeholder="Search many (separate by comma)...." 
        hasNext={hasNext}
      />
      {pokemons?.length ? (
        <PokedexTable pokemons={pokemons} />
      ) : (
        <Container>
          <div className="mt-10 w-full flex items-center justify-center">
            <EmptyState label="No Pokemon Found"/>
          </div>
        </Container>
      )}
    </div>
  );
}