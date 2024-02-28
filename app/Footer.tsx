import React from 'react';
import Container from "@/components/Container";
import WhatsappLink from "@/components/WhatsappLink";
import {Separator} from "@/components/ui/separator";
import GithubLink from "@/components/GithubLink";
import Link from "next/link";

const Footer = () => {
  return (
      <div className="sm:p-5 p-3 border-t">
        <Container>
          <div className="flex justify-between">
            <div className="sm:text-sm text-xs flex items-center gap-1 font-md text-muted-foreground mb-3 sm:mb-0">
              Created by <Link className="hover:underline text-foreground" href="https://github.com/dragon-devs/project-manager">dragon-devs</Link> © 2024 <Separator orientation="vertical" className="h-5"/>
            </div>
            <div className="flex gap-3 justify-center">
              <WhatsappLink/>
              <GithubLink username="dragon-devs"/>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default Footer;
