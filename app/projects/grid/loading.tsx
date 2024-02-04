import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar} from "@/components/ui/avatar";
import {SignalHighIcon} from "lucide-react";

const ProjectPageSkeleton = () => {
  const skeletonCount = 6; // Number of skeletons to display

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
              <div className="mt-5 flex justify-between">
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
      <div className="space-y-3 sm:space-y-5">

        <div className="">
          <div className="flex gap-3 sm:hidden">
            <Skeleton className="h-9 w-full"/>
            <Skeleton className="h-9 w-11"/>
          </div>
          <div className="hidden p-0 m-0 sm:flex gap-3">
            <Skeleton className="h-9 w-full"/>
            <Skeleton className="h-9 w-[9.5rem]"/>
            <Skeleton className="h-9 w-[11rem]"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {renderSkeletons()}
        </div>
        <div className="flex justify-between items-center ">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-9 w-[12.9rem]" />

        </div>
      </div>
  );
};

export default ProjectPageSkeleton;
