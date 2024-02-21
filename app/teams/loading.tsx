import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar} from "@/components/ui/avatar";
import {SignalHighIcon} from "lucide-react";

const ProjectPageSkeleton = () => {
  const skeletonCount = 4; // Number of skeletons to display

  const renderSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < skeletonCount; i++) {
      skeletons.push(
          <Card key={i} className="hover:ring-[0.5px] ring-foreground duration-500 transition-all">
            <CardHeader className="relative">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 mt-1">
                  <Skeleton className="h-5 w-[300px]  rounded-md"/>
                  <Skeleton className="h-3.5 w-[300px]   rounded-md"/>
                </div>
                <div className="flex gap-3 mt-1 mr-3">
                  <Skeleton className="h-4 w-4 ml-[20x] mt-1 mr-3 rounded-md"/>
                  <Skeleton className="h-4 w-4 mt-1  rounded-md"/>
                </div>
              </div>

            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-40 rounded-md"/>
                <Skeleton className="h-9 w-52 rounded-full"/>
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
          <Skeleton className="h-9 w-32"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-5">
          {renderSkeletons()}
        </div>
      </div>
  );
};

export default ProjectPageSkeleton;
