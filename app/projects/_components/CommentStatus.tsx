import React, {ReactNode} from 'react';
import {CommentStatus} from "@prisma/client";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";


interface CommentStatusProps {
    value: CommentStatus;
    label: string;
    description: string;
    icon?: ReactNode;
    className: string;
}


export const commentStatuses: CommentStatusProps[] = [
    {
        value: 'QUESTION',
        label: 'question',
        description: "Further information is requested",
        className: "text-amber-600 dark:text-amber-400"
    },
    {
        value: 'DOCUMENTATION',
        label: 'documentation',
        description: 'Improvements or additions to documentation',
        className: "text-purple-600 dark:text-purple-500"
    },
    {
        value: 'ENHANCEMENT',
        label: 'enhancement',
        description: 'A new feature or request',
        className: "text-blue-600 dark:text-blue-400"

    },
    {
        value: 'HELP_WANTED',
        label: 'help wanted',
        description: 'Extra attention is needed',
        className: "text-green-600 dark:text-green-400"
    },
    {
        value: 'BUG',
        label: 'bug',
        description: "Something isn't working as expected",
        className: "text-rose-700 dark:text-rose-500"
    },
    {
        value: 'REPLY',
        label: 'reply',
        description: "reply to a comment",
        className: "text-slate-600 dark:text-slate-400"
    },
];

interface StatuesProps {
    status: CommentStatus;
    className?: string;
}

const CommentStatues: React.FC<StatuesProps> = ({className, status}) => {
    // @ts-ignore
    const currentStatus = commentStatuses.find((commentStatus) => commentStatus.value === status);

    if (!currentStatus) {
        return <p className="text-red-500">Invalid status</p>;
    }

    return (
        <HoverCard>
            <HoverCardTrigger
                className={` ${className} ${currentStatus.className} flex gap-1 border rounded-full px-1 text-xs items-center`}>
                {currentStatus.label}
            </HoverCardTrigger>
            <HoverCardContent className="w-[70%] mx-3 sm:w-auto p-2  text-xs">
                <div>{currentStatus.description}</div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default CommentStatues;