"use client"

import React from "react";
import empty from "../public/animations/empty.json"
import Lottie from "lottie-react";
import { Typography } from "@mui/material";

interface EmptyStateProps{
    label: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    label,
}) => {
    return (
        <div className="flex items-center justify-center flex-col p-4">
            <Lottie className="h-[30vh] aspect-square" animationData={empty} loop={true} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginTop: '-3rem' }}>
              {label}
            </Typography>
        </div>
    )
}