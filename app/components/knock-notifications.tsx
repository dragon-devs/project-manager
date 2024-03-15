'use client';

import {NotificationCell, useKnockFeed,} from "@knocklabs/react";
import React, {useEffect} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {BellIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";
import {ScrollArea} from "@/components/ui/scroll-area";
import "@knocklabs/react/dist/index.css";


export const NotificationToaster = () => {
    const {feedClient} = useKnockFeed();

    // @ts-ignore
    const onNotificationsReceived = ({items}) => {
        // @ts-ignore
        items.forEach((notification) => {
            toast.info(notification.blocks[0].rendered, {id: notification.id});
        });

        feedClient.markAsSeen(items);
    };

    useEffect(() => {
        feedClient.on("items.received.realtime", onNotificationsReceived);

        return () =>
            feedClient.off("items.received.realtime", onNotificationsReceived);
    }, [feedClient]);
    return null

};

export const NotificationsList = () => {
    const {feedClient, useFeedStore} = useKnockFeed();
    const notifications = useFeedStore((state) => state.items);

    useEffect(() => {
        feedClient.fetch();
    }, [feedClient]);

    const newMessage = notifications.length;
    const unreadMessages = notifications.reduce((count, item) => {
        if (!item.read_at) {
            return count + 1;
        } else {
            return count;
        }
    }, 0);

    return (
        <Popover>
            <PopoverTrigger className="relative">
                {unreadMessages !== 0 && (<div
                    className="absolute top-1 left-0 rounded-full bg-sky-500 w-auto min-w-2 min-h-2 flex items-center justify-center text-xs">
                </div>)}

                <div className="rounded-full flex items-center justify-center border w-9 h-9 hover:bg-muted">
                    <BellIcon/>
                </div>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="p-0">
                <div>
                    <div className="border-b overflow-hidden p-4">
                        <h1> Notifications</h1>
                        {unreadMessages !== 0 && (
                            <p className="text-sm text-muted-foreground">You have <span
                                className="font-bold">{unreadMessages}</span> unread messages.</p>
                        )}
                    </div>
                    <div className="">
                        {notifications.length === 0 ? (
                            <p className="flex items-center p-4 text-sm ">No new notifications</p>
                        ) : (
                            <ScrollArea className="h-[60svh]">
                                {notifications.map((notification, index) => (
                                    <div
                                        key={index}
                                        className="border-b last:border-none flex items-start"
                                    >
                                        <div className="space-y-1 flex flex-col w-full ">
                                            <NotificationCell item={notification}/>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        )}
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    );
};




