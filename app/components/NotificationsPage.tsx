import React from 'react';
import {useSession} from "next-auth/react";
import {useTheme} from "next-themes";
import {KnockFeedProvider, KnockProvider} from "@knocklabs/react";
import {NotificationsList, NotificationToaster} from "@/app/components/knock-notifications";

const NotificationsPage = () => {
    const {data: sessionData, status} = useSession();
    const {resolvedTheme} = useTheme();

    if (status === "loading") {
        return <div
            className="rounded-full flex items-center justify-center border w-9 h-9 bg-muted animate-pulse"></div>;
    }

    if (!sessionData) {
        return null;
    }

    const {user} = sessionData;

    const colorMode = resolvedTheme === 'dark' || resolvedTheme === 'light' ? resolvedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    return (
        <KnockProvider apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY!} userId={user!.id}>
            <KnockFeedProvider colorMode={colorMode} feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID!}>
                <div>
                    <NotificationsList/>
                    <NotificationToaster/>
                </div>
            </KnockFeedProvider>
        </KnockProvider>
    );
};

export default NotificationsPage;