'use client';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {ModeToggle} from "@/components/Toggle";
import {MixIcon} from "@radix-ui/react-icons";
import Container from "@/components/Container";

const NavBar = () => {
  return (
      <>
        <Container>
          <div className="flex my-2 mx-5 lg:mx-0 justify-between items-center">
            <NavigationMenu className="gap-3">
              <Link href="/">
                <MixIcon/>
              </Link>
              <NavigationMenuList className="p-1">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/projects" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Projects
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle/>
          </div>
        </Container>
        <hr/>
      </>


  );
};

export default NavBar;
