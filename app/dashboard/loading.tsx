import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  const skeletonCount = 4;
  const skeletonCountRecentProjects = 5;

  const renderSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < skeletonCount; i++) {
      skeletons.push(
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium mr-3">
                <Skeleton className="w-24 h-4"/>
              </CardTitle>
              <Skeleton className="w-5 h-5"/>

            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold pb-2">
                <Skeleton className="w-24 h-6"/>
              </div>
              <div className="text-xs text-muted-foreground">
                <Skeleton className="w-32 h-3"/>
              </div>
            </CardContent>
          </Card>
      );
    }

    return skeletons;
  };

  const renderSkeletonsRecentProjects = () => {
    const skeletons = [];

    for (let i = 0; i < skeletonCountRecentProjects; i++) {
      skeletons.push(
          <div className="space-y-5" key={i}>
            <div className="flex items-center">
              <div className="mr-2 space-y-1">
                <Skeleton className="w-40 h-4"/>
                <Skeleton className="w-24 h-4"/>
              </div>
              <div className="ml-auto font-medium mr-3">
                <Skeleton className="w-12 h-4"/>
              </div>
              <div className="border rounded-full">
                <Skeleton className="h-10 w-10 rounded-full"/>
              </div>
            </div>
          </div>
      );
    }

    return skeletons;
  };


  return (
      <div className="flex flex-col gap-3 sm:gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {renderSkeletons()}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-40 h-4"/>
              </CardTitle>
              <Skeleton className="w-60 h-4"/>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Skeleton className="h-[18rem] "/>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-40 h-4"/>
              </CardTitle>
              <Skeleton className="w-60 h-4"/>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Skeleton className="h-[18rem] "/>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-40 h-4"/>
              </CardTitle>
              <Skeleton className="w-60 h-4"/>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-5">
                {renderSkeletonsRecentProjects()}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
  );
};

export default DashboardSkeleton;
