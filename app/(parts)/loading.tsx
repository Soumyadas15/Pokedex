"use client"

import React from "react";
import loader from "@/public/animations/Loader.json"
import { Typography } from "@mui/material";
import Lottie from "lottie-react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center flex-col p-4 mt-10">
            <Lottie className="h-[15vh] aspect-square" animationData={loader} loop={true} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
              Loading...
            </Typography>
        </div>
    )
}
export default Loading;