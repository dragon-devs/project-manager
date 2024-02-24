import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  const skeletonCount = 4; // Number of skeletons to display

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

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {renderSkeletons()}
      </div>
  );
};

export default DashboardSkeleton;
