"use client"

import Image from "next/image"
import { Container } from "./Container"
import pokeball from "@/public/assets/pokeball.png"
import { Typography } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const Header = () => {
    return (
        <Container className="mb-4">
            <div className="flex items-center justify-between pt-20">
                <div className="flex flex-col items-start gap-4">
                    <Image src={pokeball} alt="pokeball" height={120} width={120}/>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        Pokedex Problem
                    </Typography>
                    <Typography component="div" sx={{ marginTop: '-0.5rem' }}>
                        Assignment for Madverse Music
                    </Typography>
                </div>
                
                <div className="flex flex-col gap-4 items-start">
                    <PartItem 
                        label="Part 1"
                        route="part1"
                    />
                    <PartItem 
                        label="Part 2"
                        route="part2"
                    />
                    <PartItem 
                        label="Part 3"
                        route="part3"
                    />
                </div>
            </div>
        </Container>
    )
}

interface PartItemProps {
    label: string;
    route: string;
}

export const PartItem: React.FC<PartItemProps> = ({ 
    label, 
    route 
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(pathname === `/${route}`);
    }, [pathname, route]);

    return (
        <div 
            className={`p-2 px-4  
                        rounded-md hover:dark:bg-[#242424] hover:bg-[#faf9f9] cursor-pointer 
                        transition duration-300 font-semibold
                        ${isActive ? 'bg-[#e9e8e8] dark:bg-[#282828]' : ''}
                `}
            onClick={() => router.push(`/${route}`)}
        >
            {label}
        </div>
    );
}