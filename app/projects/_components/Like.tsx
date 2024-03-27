'use client';

import React, {useState} from 'react';
import {HeartFilledIcon, HeartIcon} from "@radix-ui/react-icons";
import {Comment, Like, Reply} from "@/types";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import HoverLikeUsers from "@/app/components/HoverLikeUsers";

interface LikeProps {
    comment: Comment;
    userId: string;
    reply?: Reply;
}

const Like: React.FC<LikeProps> = ({comment, userId, reply}) => {
    const [liked, setLiked] = useState(reply ? reply.likes.some((like: Like) => like.userId === userId) : comment.likes.some((like: Like) => like.userId === userId));
    const [likeCount, setLikeCount] = useState(reply ? reply.likes.length : comment.likes.length);


    const router = useRouter();
    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            const likeData = reply ? {commentId: comment.id, replyId: reply.id} : {commentId: comment.id};
            axios.post("/api/likes", likeData)
                .then(() => {
                    setLiked(true);
                    setLikeCount(prevCount => prevCount + 1);
                    router.refresh();
                })
                .catch((e) => {
                    setLiked(false);
                    setLikeCount(prevCount => prevCount - 1);
                    if (reply) {
                        toast.error("Unable to like this reply comment.");
                    } else {
                        toast.error("Unable to like this comment.");
                    }
                });
        } else {
            setLiked(false);
            axios.delete("/api/likes", {
                data: {
                    commentId: comment.id,
                    replyId: reply ? reply.id : undefined,
                }
            })
                .then((data) => {
                    setLiked(false);
                    setLikeCount(prevCount => prevCount - 1);
                    router.refresh();
                })
                .catch(() => {
                    setLiked(true);
                    setLikeCount(prevCount => prevCount + 1);
                    toast.error("Unable to unlike this comment.");
                });
        }
    };

    return (
        <div className="flex items-center gap-1 cursor-pointer">
            <div
                className="flex hover:bg-muted items-center border rounded-full p-1"
                onClick={handleLike}
            >
                {liked ? (
                    <HeartFilledIcon className="h-4 w-4 text-red-500"/>
                ) : (
                    <HeartIcon className="h-4 w-4 text-primary"/>
                )}
            </div>
            <div>
                <HoverLikeUsers likesCount={likeCount} reply={reply} comment={comment}/>
            </div>
        </div>
    );
};


export default Like;