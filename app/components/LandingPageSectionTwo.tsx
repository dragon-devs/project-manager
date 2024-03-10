import React from 'react';

const LandingPageSectionTwo = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-primary">Save Time and Manage Your All Project
                Easily.</h1>
            <div>
                <div className="relative px-3 flex sm:grid grid-cols-3">
                    <ol className="relative border-s  col-span-2 border-primary dark:border-primary">
                        <li className="mb-10 ms-6">
                            <span
                                className="absolute border-primary border flex items-center
                                shadow-xl shadow-primary transition-all
                                justify-center w-7 h-7 bg-primary-foreground rounded-full -start-[15px]
                                 dark:bg-background">
                                <svg className="w-2.5 h-2.5 text-primary dark:text-primary" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </span>
                            <h3 className="flex items-center capitalize mb-1 text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                                Django Project
                            </h3>
                            <p className="text-sm sm:text-base font-normal text-muted-foreground  ">
                                This is a Django project that integrates the Google Maps API to display maps and
                                location data. The project includes a Django application that allows users
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default LandingPageSectionTwo;