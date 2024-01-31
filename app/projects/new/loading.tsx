import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const ProjectNewPageSkeleton = () => {
  return (
      <div>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32 "/>
            <Skeleton className="h-3.5 w-60"/>
          </CardHeader>
          <CardContent>
            <div className="flex sm:space-y-6 space-y-6 mt-[4.5px] flex-col">
              <div>
                <Skeleton className="h-3.5 mb-[13.5px] w-12"/>
                <Skeleton className="h-9 rounded-md"/>
              </div>
              <div>
                <Skeleton className="h-3.5 mb-[10px] w-20"/>
                <Skeleton className="h-[8rem] rounded-md"/>
              </div>
              <div className="grid gap-6 sm:gap-5 sm:grid-cols-2">
                <div>
                  <Skeleton className="h-3.5 mb-[11px] sm:mb-[19] w-20"/>
                  <Skeleton className="h-9 rounded-md"/>
                </div>
                <div>
                  <Skeleton className="h-3.5 mb-[19px] sm:mb-[11px] w-16"/>
                  <Skeleton className="h-9 rounded-md"/>
                </div>
              </div>

            </div>
            <Skeleton className="h-9 mt-[20px] sm:mt-7 rounded-md"/>

          </CardContent>
        </Card>
      </div>
  );
};

export default ProjectNewPageSkeleton;
