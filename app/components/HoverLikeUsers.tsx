import React from 'react';
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import Image from "next/image";
import {Comment, Like} from "@/types";
import Link from "next/link";

const HoverLikeUsers = ({comment}: { comment: Comment }) => {
    const likes = comment.likes || [];

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="hover:underline cursor-pointer">{likes.length}</div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-0">
                {likes.map((like: Like) => (
                    <div className="flex items-center gap-2 border-b py-1 px-3" key={like.id}>
                        {like.user.image && (
                            <Image className="rounded-full" src={like.user.image} width={20} height={20} alt="dp"/>
                        )}
                        <span className="hover:underline">
                            <Link href={`/users/${like.user.id}`}>{like.user.name}</Link>
                        </span>
                    </div>
                ))}
            </HoverCardContent>
        </HoverCard>
    );
};

export default HoverLikeUsers;
