import React from 'react';
import Image from "next/image";

const LandingFooter = () => {
    return (
        <div
            className="w-full sm:-m-5 -m-3 py-10 bg-gradient-to-l items-center flex justify-center flex-col from-secondary to-background">
            <h1 className="animate-fade-down sm:text-3xl text-lg font-bold text-center mb-5">Project Manager is
                accessible to everyone
                worldwide.</h1>
            <Image className="animate-fade-up" width={1024} height={600} src="/world_map.svg" alt="worldmap"/>
        </div>
    );
};

export default LandingFooter;