'use client';

import React, {useRef, useState} from "react";
import {KnockFeedProvider, KnockProvider, NotificationFeedPopover, NotificationIconButton,} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import {useSession} from "next-auth/react";

export const YourAppLayout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const {data: sessionData} = useSession();

    if (!sessionData) return <div>...</div>;

    const {user} = sessionData;
    return (
        <KnockProvider
            apiKey={"pk_test_rBhm8c938x0fOqs0G9wPPXENdhLDF6--1RzJ0sgUiZU"}
            userId={user!.id}
            // In production, you must pass a signed userToken
            // and enable enhanced security mode in your Knock dashboard
            // userToken={currentUser.knockUserToken}
        >
            <KnockFeedProvider colorMode={"dark"} feedId={"1ec5a0db-7a1d-4c9e-ab62-b5a5589266af"}>
                <>
                    <NotificationIconButton
                        ref={notifButtonRef}
                        onClick={(e) => setIsVisible(!isVisible)}
                    />
                    <NotificationFeedPopover
                        buttonRef={notifButtonRef}
                        isVisible={isVisible}
                        onClose={() => setIsVisible(false)}
                    />
                </>
            </KnockFeedProvider>
        </KnockProvider>
    );
};