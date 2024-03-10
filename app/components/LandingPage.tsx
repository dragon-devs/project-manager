import React from 'react';
import {Button} from "@/components/ui/button";
import Container from "@/components/Container";
import {AspectRatio} from "@/components/ui/aspect-ratio";

const LandingPage = () => {
    return (
        <div className="w-full sm:-m-5 -m-3 bg-gradient-to-r from-secondary to-background">
            <Container>
                <div className="flex p-10 justify-center flex-col sm:flex-row gap-3 sm:gap-5 text-sm items-center">
                    <div className="flex items-start justify-center flex-col gap-3 sm:gap-5">
                        <h1 className="sm:text-5xl text-3xl font-bold text-primary">Manage Your Projects Easily and Make
                            Amazing Experience.</h1>
                        <p className="sm:text-lg text-sm mt-5 s text-primary">
                            Project Manager is an open-source project management software. Project Manager is an
                            invaluable open-source
                            solution designed for software houses and organizations seeking efficient workflow
                            management.
                            Tailored to streamline operations, it offers comprehensive tools to oversee projects, tasks,
                            and
                            resources seamlessly.</p>
                        <Button className="bg-primary text-center">Register for free</Button>
                    </div>
                    <AspectRatio ratio={16 / 7} className="bg-muted">
                    </AspectRatio>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;