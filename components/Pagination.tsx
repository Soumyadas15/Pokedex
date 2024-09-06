import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/Button"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface PaginationProps{
    hasNext: boolean;
}


export const Pagination: React.FC<PaginationProps> = ({
    hasNext,
}) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');

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

    const handlePageChange = (increment: number) => {
        const currentPage = parseInt(searchParams.get('page') || '1', 10);
        const newPage = Math.max(1, currentPage + increment);
        updateQuery(searchTerm, newPage);
    };

    return (
        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={() => handlePageChange(-1)}>
            <ChevronLeft />
          </Button>
            
          <Button disabled={!hasNext} onClick={() => handlePageChange(1)}>
            <ChevronRight />
          </Button>
        </div>
    )
}