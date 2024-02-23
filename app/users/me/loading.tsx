import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import {Skeleton} from "@/components/ui/skeleton";
import {SignalHighIcon} from "lucide-react";

const UserProfileSkeleton = () => {
  const skeletonCount = 3

  const renderSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < skeletonCount; i++) {
      skeletons.push(
          <Card key={i} className="hover:ring-[0.5px] ring-foreground duration-500 transition-all">
            <CardHeader className="relative">
              <Skeleton className="h-5 mr-14 mb-1 rounded-md"/>
              <Skeleton className="h-3.5 mr-11 rounded-md"/>
              <Avatar className="absolute right-5 top-5">
                <Skeleton className="h-10 w-10 rounded-full"/>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="flex pb-1 justify-between items-center">
                <Skeleton className="h-[1.4rem] w-32 mt-1 rounded-full"/>
                <SignalHighIcon strokeWidth={3} className="animate-pulse text-primary/10"/>
              </div>
              <div className="mt-4 flex justify-between">
                <Skeleton className="h-4 w-24 rounded-md"/>
                <Skeleton className="h-4 w-32 rounded-md"/>
              </div>
            </CardContent>
          </Card>
      );
    }

    return skeletons;
  };
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 ">
        <div className="flex flex-col">
          <Card>
            <CardHeader
                className="dark:bg-slate-800 flex sm:flex-row flex-col-reverse
                justify-between sm:items-center bg-slate-300 rounded-md rounded-b-none">
              <div className="flex flex-col gap-2.5">
                <Skeleton className="w-40 h-5"> </Skeleton>
                <Skeleton className="w-52 h-3.5"></Skeleton>
                <Badge className="w-20 justify-center">
                  <Skeleton className="w-10 h-4"></Skeleton>
                </Badge>
              </div>
              <div className="sm:pb-0 pb-5 sm:pl-3">
                <Skeleton className="w-20 h-20 border rounded-full"></Skeleton>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-3">
                <div>
                  <div className="flex">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Account Logged by</p>
                      <ChevronRightIcon/>
                      <div className="capitalize"><Skeleton className="w-14 h-5"></Skeleton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Here are all the projects assigned to you.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-5">
            <div className="flex flex-col gap-3 sm:gap-5">
              {renderSkeletons()}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default UserProfileSkeleton;
