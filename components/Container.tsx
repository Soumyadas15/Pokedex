"use client"

import { cn } from "@/lib/utils";

interface ContainerProps{
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("px-4 md:px-[10vw] h-auto w-full pt-4", className)}>
            {children}
        </div>
    )
}