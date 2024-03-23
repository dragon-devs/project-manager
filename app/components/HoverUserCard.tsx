import {CalendarIcon} from "@radix-ui/react-icons"

import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/components/ui/hover-card"
import {Users} from "@/types";
import moment from "moment";

export function HoverUserCard({user}: { user: Users }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="sm:w-auto truncate w-24">{user.name}</div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={user.image!}/>
                        <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70"/>{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined {moment(user.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
