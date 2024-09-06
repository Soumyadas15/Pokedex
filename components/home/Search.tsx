"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { TextField, useTheme } from '@mui/material';
import { Container } from '../Container';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination } from './Pagination';

interface SearchProps{
  placeholder: string;
  hasNext: boolean;
}


export const Search: React.FC<SearchProps> = ({
  placeholder,
  hasNext,
}) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 50);

    const updateQuery = useCallback(
        (name: string, page?: number) => {
            const params = new URLSearchParams(searchParams);
            if (name) {
                params.set('name', name);
            } else {
                params.delete('name');
            }
            if (page !== undefined) {
                params.set('page', page.toString());
            }
            router.push(`?${params.toString()}`);
        },
        [searchParams, router]
    );

    useEffect(() => {
        updateQuery(debouncedSearchTerm);
    }, [debouncedSearchTerm, updateQuery]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (increment: number) => {
        const currentPage = parseInt(searchParams.get('page') || '1', 10);
        const newPage = Math.max(1, currentPage + increment);
        updateQuery(searchTerm, newPage);
    };

    return (
        <Container>
          <div className='w-full flex items-center justify-between'>
            <div className='w-[70%] md:w-[50%]'>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        sx: {
                            borderRadius: '50px',
                            backgroundColor: isDarkMode ? '#282828' : '#F9F9F9',
                            color: isDarkMode ? '#FFFFFF' : '#000000',
                            transition: "background-color 0.5s ease, color 0.3s ease",
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgb(147 51 234)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(147 51 234)',
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '10px 15px',
                            color: isDarkMode ? '#FFFFFF' : '#000000',
                        },
                    }}
                />
            </div>

            <Pagination hasNext={hasNext} />
          </div>
        </Container>
    );
};