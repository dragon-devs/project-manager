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
  const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Projects', href: '/projects/grid'},
  ]

  return (
      <>
        <Container>
          <div className="flex my-1 sm:mx-5 mx-3 lg:mx-0 justify-between items-center">
            <NavigationMenu className="gap-3">
              <Link href="/">
                <MixIcon/>
              </Link>
              <NavigationMenuList className="p-1">
                {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
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
