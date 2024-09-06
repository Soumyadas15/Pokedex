import React from "react";
import { Button as MuiButton } from '@mui/base/Button';
import { cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'default' | 'destructive' | 'outline';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    onClick,
    variant = "default",
    disabled=false,
}) => {
    const variantClasses = {
        default: "dark:bg-[#6b2bcb] bg-[#803ee2] border-[#8847eb] text-white",
        destructive: "dark:bg-[#cb2b2b] bg-[#e44040] border-[#eb5151] text-white",
        outline: "bg-none border-[#b2b2b2] dark:border-[#343434] text-black dark:text-white",
    };

    return (
        <MuiButton
            disabled={disabled}
            className={cn(
                variantClasses[variant],
                "rounded-md p-2 border-[1px] px-4 font-bold",
                "text-sm hover:opacity-90 ",
                `${disabled ? "cursor-not-allowed opacity-60 hover:opacity-60" : ""}`,
                className
            )}
            onClick={onClick}
        >
            {children}
        </MuiButton>
    );
};
