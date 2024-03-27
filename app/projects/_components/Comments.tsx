import React from 'react';
import {Card, CardFooter} from "@/components/ui/card";
import prisma from "@/prisma/client";
import Like from "@/app/projects/_components/Like";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {HeartIcon} from "@radix-ui/react-icons";
import CommentStatues from "@/app/projects/_components/CommentStatus";
import {Comment} from "@/types";
import Replies from "@/app/projects/_components/Replies";
import CommentContent from "@/app/projects/_components/CommentContent";

const Comments = async ({projectId}: { projectId: string }) => {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const comments: Comment[] = await prisma.comment.findMany({
        where: {
            projectId: projectId,
        },
        include: {
            user: true,
            likes: {
                include: {
                    user: true,
                },
            },
            replies: {
                include: {
                    user: true,
                    likes: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    })

    return (
        <>
            <div className="flex flex-col gap-5 relative pt-0  z-20 ">
                <div className="border-l -z-10 border-2 h-full absolute top-5 left-5"/>
                {comments.map(comment => (
                    <Card key={comment.id}>
                        <CommentContent comment={comment}/>
                        <CardFooter className="flex justify-between items-center gap-2 pb-3 px-4">
                            <div className="flex gap-3 items-center">
                                <div>
                                    {session?.user ? (
                                        <Like comment={comment} userId={session.user.id}/>
                                    ) : <div className="flex items-center gap-1 cursor-pointer">
                                        <div
                                            className="flex hover:bg-muted justify-center items-center border rounded-full p-1">
                                            <HeartIcon className="h-4 w-4 text-primary"/>
                                        </div>
                                        <div>
                                            {comment.likes!.length}
                                        </div>
                                    </div>
                                    }

                                </div>
                                <div className="flex gap-1 items-center cursor-pointer">
                                    <Replies comment={comment}/>
                                </div>
                            </div>
                            <div>
                                <CommentStatues status={comment.status}/>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="border-b mt-5 border-2 w-full"/>
        </>
    );
};

export default Comments;