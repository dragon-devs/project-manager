import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {EnvelopeClosedIcon} from "@radix-ui/react-icons";
import Roles from "@/app/components/Roles";
import {Users} from "@/types";

const UserPopover = ({user}: { user: Users }) => {
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar className="">
                        <AvatarImage src={user.image!}/>
                        <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <div className="flex flex-col space-y-4 items-center justify-center">
                        <div className="flex justify-center flex-col space-y-2">
                            <Link
                                href={`/users/${user.id}`}
                                className="text-sm font-semibold focus:underline hover:underline">
                                {user.name}
                            </Link>
                            <Roles role={user.role!}/>
                            <div className="flex items-center ">
                                <EnvelopeClosedIcon className="mr-2 h-4 w-4 opacity-70"/>{" "}
                                <span className="text-xs text-muted-foreground">
                            {user.email}
                            </span>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default UserPopover;