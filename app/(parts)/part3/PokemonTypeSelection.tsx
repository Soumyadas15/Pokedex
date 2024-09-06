import React, { useCallback } from 'react';
import { FormControl, InputLabel, Select, MenuItem, useTheme, SelectChangeEvent } from '@mui/material';
import { Container } from '../../../components/Container';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/Pagination';

const pokemonTypes = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground',
  'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'
];

interface PokemonTypeSelectionProps {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
  hasNext: boolean;
}

export const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  selectedType,
  selectType,
  hasNext,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (type: string | undefined) => {
      const params = new URLSearchParams(searchParams);
      if (type) {
        params.set('type', type);
      } else {
        params.delete('type');
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const newType = event.target.value;
    selectType(newType === "" ? undefined : newType);
    updateQuery(newType === "" ? undefined : newType);
  };

  return (
    <Container>
      <div className='w-full flex items-center justify-between'> 
        <div className='w-[70%] md:w-[50%]'>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              id="pokemon-type-select-label"
              shrink={selectedType !== undefined && selectedType !== ''}
              sx={{
                top: '50%',
                transform: selectedType === undefined || selectedType === '' ? 'translateY(-50%) translateX(10%)' : 'translateY(0)',
                textAlign: 'left',
                visibility: selectedType ? 'hidden' : 'visible',
                transition: 'transform 0.2s ease-in-out, visibility 0.2s ease-in-out',
                paddingRight: '16px',
              }}
            >
              Pokémon Type
            </InputLabel>
            <Select
              labelId="pokemon-type-select-label"
              id="pokemon-type-select"
              value={selectedType || ''}
              onChange={handleTypeChange}
              label="Pokémon Type"
              sx={{
                height: '43px',
                borderRadius: '50px',
                backgroundColor: isDarkMode ? '#282828' : '#e9e8e8',
                color: isDarkMode ? '#FFFFFF' : '#000000',
                transition: "background-color 0.5s ease, color 0.3s ease",
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgb(147 51 234)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgb(147 51 234)',
                },
              }}
            >
              <MenuItem value="">
                <em>All Types</em>
              </MenuItem>
              {pokemonTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>  
        <Pagination hasNext={hasNext}/>
      </div>
    </Container>
  );
};
