'use client';

import {KnockFeedProvider, KnockProvider, NotificationCell, useKnockFeed,} from "@knocklabs/react";
import {useSession} from "next-auth/react";
import React, {useEffect} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {BellIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";
import {ScrollArea} from "@/components/ui/scroll-area";
import "@knocklabs/react/dist/index.css";


const NotificationToaster = () => {
    const {feedClient} = useKnockFeed();

    // @ts-ignore
    const onNotificationsReceived = ({items}) => {
        // Whenever we receive a new notification from our real-time stream, show a toast
        // (note here that we can receive > 1 items in a batch)
        // @ts-ignore
        items.forEach((notification) => {
            toast.info(notification.blocks[0].rendered, {id: notification.id});
        });

        // Optionally, you may want to mark them as "seen" as well
        feedClient.markAsSeen(items);
    };

    useEffect(() => {
        // Receive all real-time notifications on our feed
        feedClient.on("items.received.realtime", onNotificationsReceived);

        // Cleanup
        return () =>
            feedClient.off("items.received.realtime", onNotificationsReceived);
    }, [feedClient]);
    return null

};

export default NotificationToaster;
const NotificationsList = () => {
    const {feedClient, useFeedStore} = useKnockFeed();
    const notifications = useFeedStore((state) => state.items);

    useEffect(() => {
        feedClient.fetch();
    }, [feedClient]);

    const newMessage = notifications.length;


    return (
        <Popover>
            <PopoverTrigger className="relative">
                {newMessage !== 0 && (<div
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
                        {newMessage !== 0 && (
                            <p className="text-sm text-muted-foreground">You have <span
                                className="font-bold">{newMessage}</span> unread messages.</p>
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

export const NotificationsPage = () => {
    const {data: sessionData} = useSession();

    if (!sessionData) return <div>...</div>;

    const {user} = sessionData;
    return (
        <KnockProvider apiKey={process.env.KNOCK_PUBLIC_API_KEY!} userId={user!.id}>
            <KnockFeedProvider feedId={process.env.KNOCK_FEED_CHANNEL_ID!}>
                <div>
                    <NotificationsList/>
                    <NotificationToaster/>
                </div>
            </KnockFeedProvider>
        </KnockProvider>
    );
};
