import React from 'react';
import DeleteComment from "@/app/projects/_components/DeleteComment";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import {Comment, Reply} from "@/types";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";


const ProjectCommentsActions = async ({comment}: { comment: Comment | Reply }) => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex items-center">
            <Popover>
                <PopoverTrigger className="">
                    <DotsHorizontalIcon className="h-5 w-5 "/>
                </PopoverTrigger>
                <PopoverContent className="p-0 m-0 flex flex-col w-40 text-start">
                    <div className="">
                        {session && (
                            session.user!.role === 'ADMIN' ||
                            session.user!.role === 'MODERATOR' ||
                            comment.user.id === session.user!.id
                        ) && (
                            <>
                                {(session.user!.role === 'ADMIN' || comment.user.id === session.user!.id || comment.user.role !== 'ADMIN') && (
                                    <div>
                                        <div className="rounded-t-sm text-start gap-2 hover:bg-destructive/90">
                                            <DeleteComment commentId={comment.id}/>
                                        </div>
                                        <Separator/>
                                        <div className="hover:bg-blue-500 hover:text-white p-1.5 px-3">
                                            <div>Edit</div>
                                        </div>
                                        <Separator/>
                                    </div>
                                )}
                            </>
                        )}
                        <div className={`${!session && "rounded-t-sm"} hover:bg-muted p-1.5 px-3`}>
                            <div>Report</div>
                        </div>
                        <Separator/>
                        <div className="rounded-b-sm hover:bg-muted p-1.5 px-3">
                            <div>Share</div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ProjectCommentsActions;