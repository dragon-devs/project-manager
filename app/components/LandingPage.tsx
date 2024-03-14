import React from 'react';
import {Button} from "@/components/ui/button";
import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
    return (
        <div className="w-full sm:-m-5 -m-3 py-10 bg-gradient-to-r from-secondary to-background">
            <Container>
                <div
                    className="relative grid grid-cols-1 sm:grid-cols-2 sm:p-5 p-3 justify-center gap-3 sm:gap-5 text-sm items-center">
                    <div className=" animate-fade-left flex items-start justify-center flex-col gap-3 sm:gap-5">
                        <h1 className="sm:text-5xl text-3xl font-extrabold text-primary">
                            <span className="text-blue-500 ">Manage</span> Your Projects Easily and Make Amazing <span
                            className="dark:text-amber-300 text-amber-500">Experience</span>.
                        </h1>
                        <p className="sm:text-[1rem] text-sm mt-5 ">Project Manager is an invaluable
                            open-source solution designed for software houses and organizations seeking efficient
                            workflow management. Tailored to streamline operations, it offers comprehensive tools to
                            oversee projects, tasks, and resources seamlessly.</p>
                        <Link href="/api/auth/signin">
                            <Button className="bg-primary text-center mt-2">Login for Demo</Button>
                        </Link>
                    </div>
                    <div className="">
                        <Image
                            width={500}
                            height={500}
                            src="/hero_icon.svg"
                            className="md:absolute top-0 h-96 right-0 animate-fade-right"
                            alt="hero_picture"
                        />
                    </div>

                </div>
            </Container>
        </div>
    );
};
export default LandingPage;