import React from 'react';
import { Badge } from "@/components/ui/badge";
import Container from "@/components/Container";
import WhatsappLink from "@/components/WhatsappLink";
import {Separator} from "@/components/ui/separator";
import GithubLink from "@/components/GithubLink";

const Footer = () => {
  return (
    <div className="sm:p-5 p-3 border-t ">
      <Container>
        <div className="flex justify-between">
          <div className="sm:text-sm text-xs flex items-center gap-3 font-md text-muted-foreground mb-3 sm:mb-0">
            Copyright © 2024 dragon-devs <Separator orientation="vertical" className="h-5"/>
          </div>
          <div className="flex gap-3 justify-center">
            <WhatsappLink />
            <GithubLink username="dragon-devs" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
