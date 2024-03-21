import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {HeartFilledIcon} from "@radix-ui/react-icons";

const Comments = () => {
    return (
        <>
            <div className="flex flex-col gap-5 relative pt-5 z-20">
                <div className="border-l -z-10 border-2 h-full absolute top-5 left-5"/>
                <Card>
                    <CardHeader className="border-b bg-muted rounded-t-md p-2 px-4">
                        <CardTitle className="flex justify-between items-center gap-2 text-sm">
                            <div className="flex gap-2">
                                Username
                                <div className="font-normal text-muted-foreground">
                                    commented 2 weeks ago
                                </div>
                            </div>
                            <div className="ml-auto">
                                Auther
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 px-4">
                        Enhance a task management tool by introducing automation features, allowing users to create and
                        schedule automated tasks.
                    </CardContent>
                    <CardFooter className="pb-3 px-4">
                        <div className="flex justify-center items-center border rounded-full p-1">
                            <HeartFilledIcon className="w-5 h-5 pt-0.5"/>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="border-b mt-5 border-2 w-full"/>

        </>
    );
};

export default Comments;