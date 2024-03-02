import {useMemo} from "react";
import {FeedItem} from "@knocklabs/client";
import {formatDistanceToNow} from "date-fns";

type Props = {
    item: FeedItem,
};

export const NotificationCell: React.FC<Props> = ({item}) => {
    // Group the content blocks by the name for easy lookup
    const blocksByName = useMemo(() => {
        return item.blocks.reduce((acc, block) => {
            return {...acc, [block.name]: block};
        }, {});
    }, [item]);

    const maybeActor = item.actors[0];
    const receivedAt = item.inserted_at;


    let receivedAtFormatted = "";
    if (receivedAt) {
        // Convert receivedAt to Date object
        const receivedDate = new Date(receivedAt);
        // Format to "X time ago"
        receivedAtFormatted = formatDistanceToNow(receivedDate, {addSuffix: true});
    }

    return (
        <div className="notification-cell">
            {maybeActor && (
                // @ts-ignore
                <span className="notification-cell__actor">{maybeActor.name}</span>
            )}

            {blocksByName && (
                <div
                    className="notification-cell__content"
                    // @ts-ignore
                    dangerouslySetInnerHTML={{__html: blocksByName.body.rendered}}
                />
            )}
            {receivedAtFormatted && (
                <p className="text-xs text-muted-foreground">{receivedAtFormatted}</p>
            )}
        </div>
    );
};
