'use client';

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import Container from "@/components/Container";
import {Badge} from "@/components/ui/badge";
import packageInfo from '../package.json';
import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import {ModeToggle} from "@/components/Toggle";
import {ChevronRightIcon, MixIcon} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";
import {MobileNav} from "@/components/MobileNav";

const NavBar = () => {
  const currentPath = usePathname();
  const {status, data: session} = useSession();

  const version = packageInfo.version;


  const links = [
    {title: 'Dashboard', href: '/'},
    {title: 'Projects', href: '/projects/grid'},
    {title: 'Teams', href: '/teams'},
    {title: 'My Profile', href: '/users/me'},
  ];


  return (
      <div className="border-b">
        <Container>
          <div className="flex my-1 sm:mx-5 xl:mx-0 mx-3 justify-between items-center">
            <NavigationMenu className="gap-3">
              <Link className="hidden sm:block" href="/">
                <MixIcon/>
              </Link>
              <div className="flex items-center sm:hidden">
                <MobileNav links={links}/>
                <div className="flex items-center justify-center flex-grow">
                  {links.map((link) => (
                      <div key={link.href}>
                        {link.href === currentPath && (
                            <div className="flex items-center text-sm gap-2">
                              <ChevronRightIcon/>
                              {link.title}
                            </div>
                        )}
                      </div>
                  ))}
                </div>
              </div>


              <NavigationMenuList className="p-1 hidden sm:flex gap-2">
                {links.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <Link href={link.href} passHref>
                        <div
                            className={`text-sm transition-colors duration-800 ${
                                link.href === currentPath
                                    ? "border-foreground/80 transition-colors"
                                    : "text-muted-foreground transition-colors"
                            }`}
                        >
                          {link.title}
                        </div>
                      </Link>
                    </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex gap-2 items-center justify-center">
              <Link href="/changelog">
                <Badge variant="secondary" className="sm:text-xs text-[0.6rem]">
                  v{version}
                </Badge>
              </Link>
              <div className="sm:flex items-center gap-2 hidden">
                <ModeToggle/>
              </div>
              {status === 'loading' && <Skeleton className="h-5 w-[2.25rem]"/>}
              {status === 'authenticated' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="w-9 h-9 border">
                        <AvatarImage src={session.user!.image!} alt="profile_picture"/>
                        <AvatarFallback className="text-xs">DP</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className="text-muted-foreground">
                        {session?.user!.name}
                      </DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link className="w-full" href="/users/me">
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="w-full" href="/api/auth/signout">
                          Log out
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              )}
              {status === "unauthenticated" &&
                  <Link className="text-sm -ml-[0.02rem]" href="/api/auth/signin">Login</Link>}
            </div>
          </div>
        </Container>
      </div>
  );
};

export default NavBar;
