"use client"

import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useModal } from '@/hooks/useModal.hook';
import { Plus } from "lucide-react";

export const Navbar = () => {
    const { onOpen } = useModal();
    
    return (
        <div className='w-full h-14 fixed flex items-center justify-center mt-4 z-[99]'>
            <div className="bg-[#1f1f1f] bg-opacity-0 backdrop-filter backdrop-blur-lg h-14 fixed w-[95%] md:w-[80%] flex  items-center justify-between px-4 md:px-20 rounded-full transition-colors duration-300 z-[99]">
                <div>
                    <h1 className="text-xl font-bold text-[#803ee2] dark:text-[#a06dec]">Pokedex</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <ThemeToggle />
                </div>
            </div>
        </div>
        
    )
}