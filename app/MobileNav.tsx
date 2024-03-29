"use client"

import * as React from "react"
import Link, {LinkProps} from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {HamburgerMenuIcon, MixIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {ModeToggle} from "@/components/Toggle";

export function MobileNav({links}: Readonly<{ links: { title: string; href: string }[] }>) {
  const currentPath = usePathname();
  const [open, setOpen] = React.useState(false)

  return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
          >
            <HamburgerMenuIcon className="h-5 w-5"/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileLink
              href="/"
              className="flex item-center mt-5 justify-between"
              onOpenChange={setOpen}
          >
            <div className="flex items-center justify-center ">
              <MixIcon className="-ml-2 mr-3 h-5 w-5"/>
              <span className="font-bold">Project Manager</span>
            </div>
            <div className="flex items-center gap-2 mr-5">
              <ModeToggle/>
            </div>
          </MobileLink>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-2">
            <div className="flex flex-col space-y-3">
              {links?.map(
                  (link) =>
                      link.href && (
                          <MobileLink
                              className={`text-sm transition-colors duration-800 ${
                                  link.href === currentPath
                                      ? "border-foreground/80 transition-colors underline underline-offset-4"
                                      : "text-muted-foreground transition-colors"
                              }`}
                              key={link.href}
                              href={link.href}
                              onOpenChange={setOpen}
                          >
                            {link.title}
                          </MobileLink>
                      )
              )}
            </div>
            <div className="flex flex-col space-y-2">

            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
                      href,
                      onOpenChange,
                      className,
                      children,
                      ...props
                    }: Readonly<MobileLinkProps>) {
  const router = useRouter()
  return (
      <Link
          href={href}
          onClick={() => {
            router.push(href.toString())
            onOpenChange?.(false)
          }}
          className={cn(className)}
          {...props}
      >
        {children}
      </Link>
  )
}