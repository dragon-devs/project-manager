import React from 'react';
import Container from "@/components/Container";
import {FileCheck, FilesIcon, TimerIcon, UsersIcon} from "lucide-react";


const LandingPageSectionTwo = () => {
    return (
        <div className="sm:py-10 py-5 flex m-5 sm:m-0">
            <Container>
                <h1 className="animate-fade-down sm:text-3xl text-xl font-bold text-center text-primary mb-5 sm:mb-10">
                    <span className="dark:text-green-300 text-green-500">Save Time</span> and Manage Your All
                    Project <span className="dark:text-amber-300 text-amber-500">Easily</span>.</h1>
                {renderListLTR("Project Management Can Easily", "Experience seamless project planning and execution with our intuitive management tools. Improve collaboration and productivity across your team, effortlessly.",
                    <FilesIcon className="w-5 h-5 text-blue-500"/>)}
                {renderListRTL("Project Assigning to Users", "Effortlessly assign and track projects for your team members using our intuitive management tools. Streamline collaboration and boost productivity.",
                    <FileCheck className="w-5 h-5 text-blue-500"/>)}
                {renderListLTR("Team Management and Collaboration", "Efficiently manage your team and foster seamless collaboration with our powerful tools. Streamline communication, tasks, and projects to drive success.",
                    <UsersIcon className="w-5 h-5 text-blue-500"/>)}
                {renderListRTL("Time Management And Save", "Optimize your time management and save valuable resources with our innovative tools. Increase productivity and efficiency across your projects.",
                    <TimerIcon className="w-5 h-5 text-blue-500"/>)}
            </Container>
        </div>
    );
};

const renderListRTL = (title: string, description: string, icon: React.ReactNode) => {
    return (
        <div className="animate-fade-left relative px-3 flex sm:grid grid-cols-2 " dir="rtl">
            <div></div>
            <ol className="relative">
                <li className="mb-10 sm:ms-10 ms-7 ">
                <span
                    className="absolute flex items-center
                    shadow-lg shadow-blue-500 transition-all
                    justify-center w-10 h-10 bg-primary-foreground rounded-full -start-5
                    dark:bg-background">
                    {icon}
                </span>
                    <p className="flex items-center capitalize mb-1 text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </p>
                    <p className="text-sm sm:text-base font-normal text-muted-foreground  ">
                        {description}
                    </p>
                </li>
            </ol>
        </div>
    );
};


const renderListLTR = (title: string, description: string, icon: React.ReactNode) => {
    return (
        <div className="animate-fade-right relative px-3 flex sm:grid grid-cols-2 " dir="ltr">
            <div></div>
            <ol className="relative">
                <li className="mb-10 sm:ms-10 ms-7 ">
                    <span
                        className="absolute flex items-center
                        shadow-lg shadow-blue-500 transition-all
                        justify-center w-10 h-10 bg-primary-foreground rounded-full -start-5
                        dark:bg-background">
                        {icon}
                    </span>
                    <p className="flex items-center capitalize mb-1 text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </p>
                    <p className="text-sm sm:text-base font-normal text-muted-foreground  ">
                        {description}
                    </p>
                </li>
            </ol>
        </div>
    );
};

export default LandingPageSectionTwo;