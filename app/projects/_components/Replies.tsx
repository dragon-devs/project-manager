import React from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {ChatBubbleIcon, HeartIcon} from "@radix-ui/react-icons";
import {Comment} from "@/types";
import {Card, CardFooter} from "@/components/ui/card";
import CommentStatues from "@/app/projects/_components/CommentStatus";
import authOptions from "@/app/auth/authOptions";
import {getServerSession} from "next-auth";
import Like from "@/app/projects/_components/Like";
import CommentContent from "@/app/projects/_components/CommentContent";

const Replies = async ({comment}: { comment: Comment }) => {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <Sheet>
                <SheetTrigger className="flex gap-1 items-center cursor-pointer">
                    <div
                        className="flex gap-1 hover:bg-muted text-muted-foreground justify-center items-center border rounded-full p-1 px-1">
                        <ChatBubbleIcon className="h-4 w-4 text-primary"/>
                    </div>
                    <div>
                        {comment.replies.length}
                    </div>
                </SheetTrigger>
                <SheetContent className="w-full p-3 sm:p-5 xl:w-1/3 md:w-2/4 sm:max-w-none">
                    <div className="flex flex-col gap-3 sm:gap-5">
                        <SheetHeader>
                            <SheetTitle className="border-b pb-2">Replies</SheetTitle>
                        </SheetHeader>

                        <div className="relative z-30">
                            <Card>
                                <CommentContent comment={comment}/>
                                <CardFooter className="flex justify-between items-center gap-2 pb-3 px-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            {session?.user ? (
                                                    <Like comment={comment} userId={session.user!.id}/>
                                                ) :
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    <div
                                                        className="flex hover:bg-muted justify-center items-center border rounded-full p-1">
                                                        <HeartIcon className="h-4 w-4 text-primary"/>
                                                    </div>
                                                    <div>
                                                        {comment.likes.length}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <CommentStatues status={comment.status}/>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="relative pt-3 sm:pt-5 broder border-t-2 flex flex-col gap-3 sm:gap-5 z-20">
                            <div className="border-l -z-20 border-2 h-full absolute -top-5 left-5"/>
                            {comment.replies.map(reply => (
                                <div key={reply.id}>
                                    <Card>
                                        <CommentContent comment={reply}/>
                                        <CardFooter className="flex justify-between items-center gap-2 pb-3 px-4">
                                            {session?.user ?
                                                <Like reply={reply} comment={comment} userId={session!.user!.id}/> :
                                                (
                                                    <div
                                                        className="flex justify-between items-center gap-1 cursor-pointer">
                                                        <div
                                                            className="flex hover:bg-muted justify-center items-center border rounded-full p-1">
                                                            <HeartIcon className="h-4 w-4 text-primary"/>
                                                        </div>
                                                        <div>
                                                            {reply.likes.length}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div>
                                                <div
                                                    className="font-extrabold text-muted-foreground/50 sm:text-lg">#{reply.replyNumber}</div>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    );
};

export default Replies;