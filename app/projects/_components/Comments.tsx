import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import moment from "moment";
import prisma from "@/prisma/client";
import Roles from "@/app/components/Roles";
import Link from "next/link";
import {HoverUserCard} from "@/app/components/HoverUserCard";
import HoverLikeUsers from "@/app/components/HoverLikeUsers";
import Like from "@/app/projects/_components/Like";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {HeartIcon} from "@radix-ui/react-icons";
import CommentStatues from "@/app/projects/_components/CommentStatus";
import ProjectCommentActions from "@/app/projects/[id]/ProjectCommentActions";

const Comments = async ({projectId}: { projectId: string }) => {
    const session = await getServerSession(authOptions);
    const comments = await prisma.comment.findMany({
        where: {
            projectId: projectId,
        },
        include: {
            user: true,
            Like: {
                include: {
                    user: true,
                }
            }
        }
    })

    return (
        <>
            <div className="flex flex-col gap-5 relative pt-0  z-20 ">
                <div className="border-l -z-10 border-2 h-full absolute top-5 left-5"/>
                {comments.map(comment => (
                    <Card key={comment.id}>
                        <CardHeader className="border-b bg-muted rounded-t-md p-2 px-4">
                            <CardTitle className="flex justify-between items-center gap-2 text-sm">
                                <div className="flex gap-1 sm:gap-2 items-center">
                                    <Link className="hover:underline" href={`/users/${comment.user.id}`}>
                                        <HoverUserCard user={comment.user!}/>
                                    </Link>
                                    <div className="flex gap-1 font-normal text-xs sm:text-sm text-muted-foreground">
                                        <span className="sm:block hidden">commented</span>
                                        {moment(comment.createdAt).fromNow()}
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <div className="flex gap-1 items-center ">
                                        <Roles className="bg-background" role={comment.user.role!}/>
                                        {session!.user!.role === 'ADMIN' || session!.user!.role === 'MODERATOR' || comment.user.id === session!.user!.id && (
                                            <ProjectCommentActions commentId={comment.id}/>
                                        )}
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 px-4">
                            {comment.content}
                        </CardContent>
                        <CardFooter className="flex justify-between items-center gap-2 pb-3 px-4">
                            <div className="flex gap-2 items-center">
                                {session?.user ? (
                                    <Like comment={comment} userId={session.user.id}/>
                                ) : <div
                                    className="flex hover:bg-muted justify-center items-center border rounded-full p-1">
                                    <HeartIcon className="h-4 w-4 text-primary"/>
                                </div>
                                }
                                <div>
                                    <HoverLikeUsers comment={comment}/>
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