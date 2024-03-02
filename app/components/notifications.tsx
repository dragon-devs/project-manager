'use client';

import React, {useState} from 'react';
import {BellIcon} from "@radix-ui/react-icons";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Card} from "@/components/ui/card";

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },

]

type CardProps = React.ComponentProps<typeof Card>
const Notifications = ({className, ...props}: CardProps) => {
    const [newMessage, setNewMessage] = useState(true)
    const [read, setRead] = useState(true)

    return (
        <Popover>
            <PopoverTrigger className="relative">
                <div
                    className="absolute top-1 left-0 rounded-full bg-sky-500 w-auto min-w-2 min-h-2 flex items-center justify-center text-xs">
                </div>
                <div className="rounded-full flex items-center justify-center border w-9 h-9 hover:bg-muted">
                    <BellIcon/>
                </div>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="p-0">
                <div className={className} {...props}>
                    <div className="border-b overflow-hidden p-4">
                        <h1> Notifications</h1>
                        {newMessage && <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>}
                    </div>
                    <div className="">
                        {notifications.length === 0 ? (
                            <p className="flex items-center p-4 text-sm ">No new notifications</p>
                        ) : (
                            <div>
                                {notifications.map((notification, index) => (
                                    <div
                                        key={index}
                                        className="border-b py-2 px-4 last:border-none flex items-start "
                                    >
                                        {read &&
                                            <span
                                                className="flex h-2 w-2 translate-y-1 mr-3  rounded-full bg-sky-500"/>}
                                        <div className="space-y-1 flex flex-col w-full">
                                            <p className="text-sm font-medium leading-none">
                                                {notification.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Notifications;