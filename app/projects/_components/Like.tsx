'use client';

import React, {useState} from 'react';
import {HeartFilledIcon, HeartIcon} from "@radix-ui/react-icons";
import {Comment, Like} from "@/types";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


const Like = ({comment, userId}: { comment: Comment, userId: string }) => {
    const [liked, setLiked] = useState(comment.Like.some((like: Like) => like.userId === userId));

    const router = useRouter();
    const handleLike = (id: string) => {
        if (!liked) {
            setLiked(true);
            axios.post("/api/likes", {commentId: id})
                .then(() => {
                    setLiked(true);
                    router.refresh();
                })
                .catch(() => {
                    setLiked(false);
                    toast.error("Unable to like this comment.");
                });

        } else {
            axios.delete("/api/likes", {data: {commentId: id}})
                .then(() => {
                    setLiked(false);
                    router.refresh();
                })
                .catch(() => {
                    toast.error("Unable to unlike this comment.");
                });
        }
    };

    return (
        <div>
            <div
                className="flex hover:bg-muted justify-center items-center border rounded-full p-1"
                onClick={() => handleLike(comment.id)}
            >
                {liked ? (
                    <HeartFilledIcon className="h-4 w-4 text-red-500"/>
                ) : (
                    <HeartIcon className="h-4 w-4 text-primary"/>
                )}
            </div>
        </div>
    );
};


export default Like;