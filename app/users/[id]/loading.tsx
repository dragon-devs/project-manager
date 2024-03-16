import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";
import {ChevronRightIcon} from "@radix-ui/react-icons";

const UserSkeleton = () => {
    return (
        <div className="space-y-3 sm:space-y-5">
            <Card>
                <CardHeader
                    className="dark:bg-accent bg-accent flex sm:flex-row flex-col-reverse
                justify-between sm:items-center  rounded-md rounded-b-none">
                    <div className="flex flex-col">
                        <CardTitle><Skeleton className="w-32 h-4 mb-3"/></CardTitle>
                        <CardDescription><Skeleton className="w-52 h-4 mb-2"/></CardDescription>
                        <Badge className="w-20 justify-center"><Skeleton className="w-10 h-4"/></Badge>
                    </div>
                    <div className="sm:pb-0 pb-5 sm:pl-3">
                        <Avatar className="w-20 h-20 border">
                            <Skeleton className="w-20 h-20"/>
                        </Avatar>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-3">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">Account Logged by</p>
                            <ChevronRightIcon/>
                            <Skeleton className="w-20 h-4"/>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="">
                <CardHeader className="">
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Projects list assign to this user.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex flex-col border-t px-5 py-3.5">
                        <Skeleton className="w-52 h-4"/>
                    </div>
                    <div className="flex flex-col border-t px-5 py-3.5">
                        <Skeleton className="w-60 h-4"/>
                    </div>
                    <div className="flex flex-col border-t px-5 py-3.5">
                        <Skeleton className="w-72 h-4"/>
                    </div>
                    <div className="flex flex-col border-t px-5 py-3.5">
                        <Skeleton className="w-56 h-4"/>
                    </div>
                    <div className="flex flex-col border-t px-5 py-3.5">
                        <Skeleton className="w-80 h-4"/>
                    </div>
                    <div className="flex flex-col border-t px-5 py-3.5">
                        <Skeleton className="w-60 h-4"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserSkeleton;