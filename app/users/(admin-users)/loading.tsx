import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
    const skeletonArray = Array.from({length: 10}, (_, index) => index);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 sm:gap-5 gap-3">
            {skeletonArray.map((index) => (
                <Card>
                    <CardHeader className="relative">
                        <CardTitle className="truncate sm:w-full w-3/4 capitalize hover:underline">
                            <Skeleton className="h-5 w-40"/>
                        </CardTitle>
                        <CardDescription className="truncate sm:w-full w-3/4">
                            <Skeleton className="h-5 w-60"/>
                        </CardDescription>
                        <Avatar className="absolute w-12 h-12 top-4 right-5">
                            <Skeleton className="h-12 w-12 rounded-full"/>
                        </Avatar>
                    </CardHeader>
                    <CardContent className="flex mt-[2.5px] justify-between flex-row-reverse">
                        <div className="flex gap-2">
                            <Skeleton className="h-9 w-32"/>
                            <Skeleton className="h-9 w-9"/>
                        </div>
                        <div className="flex flex-col text-[10px]">
                            <Skeleton className="h-3 w-24 mb-2"/>
                            <Skeleton className="h-3 w-32"/>
                        </div>
                    </CardContent>
                </Card>
            ))}

        </div>
    );
};

export default LoadingSkeleton;