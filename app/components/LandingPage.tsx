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
                    className="flex sm:p-5 p-3 justify-center flex-col md:flex-row gap-3 sm:gap-5 text-sm items-center">
                    <div className="flex items-start justify-center flex-col gap-3 sm:gap-5">
                        <h1 className="sm:text-5xl text-3xl font-extrabold text-primary">Manage Your Projects Easily and
                            Make
                            Amazing <span className="dark:text-amber-300 text-amber-500">Experience</span>.</h1>
                        <p className="sm:text-[1rem] text-sm mt-5 ">Project Manager is an invaluable
                            open-source solution designed for software houses and organizations seeking efficient
                            workflow management. Tailored to streamline operations, it offers comprehensive tools to
                            oversee projects, tasks, and resources seamlessly.</p>
                        <Link href="/api/auth/signin">
                            <Button className="bg-primary text-center mt-2">Login for Demo</Button>
                        </Link>
                    </div>
                    <Image width={500} height={500} src="/project_manager_landing-01.png" alt="hero_picture"/>
                </div>
            </Container>
        </div>
    );
};
export default LandingPage;