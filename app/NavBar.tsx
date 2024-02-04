'use client';

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {ModeToggle} from "@/components/Toggle";
import {MixIcon} from "@radix-ui/react-icons";
import Container from "@/components/Container";
import {Badge} from "@/components/ui/badge";
import {version} from '../package.json';
import {usePathname} from "next/navigation";

const NavBar = () => {
  const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Projects', href: '/projects/grid'},
  ];

  const currentPath = usePathname();

  return (
    <div className="border-b">
      <Container>
        <div className="flex my-1 sm:mx-5 mx-3 lg:mx-0 justify-between items-center">
          <NavigationMenu className="gap-3">
            <Link href="/">
              <MixIcon/>
            </Link>
            <NavigationMenuList className="p-1 flex gap-2">
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`text-sm hover:border-muted-foreground/50  border-b pb-[13px] transition-colors duration-800 ${
                        link.href === currentPath
                          ? "border-foreground/80 transition-colors hover:text-foreground/80 hover:border-foreground/60"
                          : "text-muted-foreground transition-colors hover:text-foreground/80"
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex gap-2 items-center ">
            <Badge variant="secondary" className="sm:text-xs text-[0.6rem]">
              v{version}
            </Badge>
            <ModeToggle/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
