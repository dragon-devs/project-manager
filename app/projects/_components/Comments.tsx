import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {HeartIcon} from "@radix-ui/react-icons";
import moment from "moment";
import prisma from "@/prisma/client";
import Roles from "@/app/components/Roles";
import Link from "next/link";
import {HoverUserCard} from "@/app/components/HoverUserCard";

const Comments = async ({projectId}: { projectId: string }) => {
    const comments = await prisma.comment.findMany({
        where: {
            projectId: projectId,
        },
        include: {
            user: true
        }
    })
    return (
        <>
            <div className="flex flex-col gap-5 relative pt-5 z-20">
                <div className="border-l -z-10 border-2 h-full absolute top-5 left-5"/>
                {comments.map(comment => (
                    <Card key={comment.id}>
                        <CardHeader className="border-b bg-muted rounded-t-md p-2 px-4">
                            <CardTitle className="flex justify-between items-center gap-2 text-sm">
                                <div className="flex gap-2">
                                    <Link className="hover:underline" href={`/users/${comment.user.id}`}>
                                        <HoverUserCard user={comment.user!}/>
                                    </Link>
                                    <div className="font-normal text-muted-foreground">
                                        commented {moment(comment.createdAt).fromNow()}
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <Roles className="bg-background" role={comment.user.role!}/>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 px-4">
                            {comment.content}
                        </CardContent>
                        <CardFooter className="pb-3 px-4">
                            <div className="flex hover:bg-muted justify-center items-center border rounded-full p-1">
                                <HeartIcon className="w-5 h-5 pt-0.5"/>
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