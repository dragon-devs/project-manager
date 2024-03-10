import React from "react";
import LandingPage from "@/app/components/LandingPage";
import LandingPageSectionTwo from "@/app/components/LandingPageSectionTwo";

export default function Home() {
    return (
        <div
            className="flex justify-center flex-col gap-3 text-sm items-center bg-background w-[100vw] relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
            <LandingPage/>
            <LandingPageSectionTwo/>

        </div>
    );
}
