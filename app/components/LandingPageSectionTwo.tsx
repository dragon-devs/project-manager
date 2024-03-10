import React from 'react';
import Container from "@/components/Container";


const LandingPageSectionTwo = () => {
    return (
        <div className="sm:py-10 py-5 flex m-5 sm:m-0">
            <Container>
                <h1 className="sm:text-3xl text-xl font-bold text-center text-primary mb-5 sm:mb-10">
                    Save Time and Manage Your All Project Easily.</h1>
                {renderListLTR("Project Management Can Easily", "Project Manager is an invaluable open-source solution designed for software houses and organizations seeking efficient workflow")}
                {renderListRTL("Project Assigning to Users", "Project Manager is an invaluable open-source solution designed for software houses and organizations seeking efficient workflow")}
                {renderListLTR("Team Management and Collaboration", "Project Manager is an invaluable open-source solution designed for software houses and organizations seeking efficient workflow")}
                {renderListRTL("Time Management And Save", "Project Manager is an invaluable open-source solution designed for software houses and organizations seeking efficient workflow")}
            </Container>
        </div>
    );
};

const renderListRTL = (title: string, description: string) => {
    return (
        <div className="relative px-3 flex sm:grid grid-cols-2 " dir="rtl">
            <div></div>
            <ol className="relative border-dotted border-primary dark:border-primary">
                <li className="mb-10 sm:ms-10 ms-7 ">
                <span
                    className="absolute border-primary border-2 flex items-center
                    shadow-xl shadow-primary transition-all
                    justify-center w-10 h-10 bg-primary-foreground rounded-full -start-5
                    dark:bg-background">
                    <svg className="w-4 h-4 text-primary dark:text-primary" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
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

const renderListLTR = (title: string, description: string) => {
    return (
        <div className="relative px-3 flex sm:grid grid-cols-2 " dir="ltr">
            <div></div>
            <ol className="relative border-dotted border-primary dark:border-primary">
                <li className="mb-10 sm:ms-10 ms-7 ">
                <span
                    className="absolute border-primary border-2 flex items-center
                    shadow-xl shadow-primary transition-all
                    justify-center w-10 h-10 bg-primary-foreground rounded-full -start-5
                    dark:bg-background">
                    <svg className="w-4 h-4 text-primary dark:text-primary" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
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