import React from 'react';
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {HoverUserCard} from "@/app/components/HoverUserCard";
import moment from "moment/moment";
import Roles from "@/app/components/Roles";
import ProjectCommentsActions from "@/app/projects/[id]/ProjectCommentsActions";
import {Comment, Reply} from "@/types";

const CommentContent = ({comment}: { comment: Comment | Reply }) => {
    return (
        <div>
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
                        <div className="flex gap-1 items-center -mr-2 sm:-mr-0">
                            <Roles className="bg-background" role={comment.user.role!}/>
                            <ProjectCommentsActions comment={comment}/>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2 px-4">
                {comment.content}
            </CardContent>
        </div>
    );
};

export default CommentContent;