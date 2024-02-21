import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {DotsVerticalIcon} from "@radix-ui/react-icons";

const ProjectDetailsPageSkeleton = () => {
  return (
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-5 w-32 mb-2.5"/>
            <Skeleton className="h-3.5 w-64 mb-5"/>
          </div>
          <div className="hidden sm:flex gap-3">
            <Skeleton className="h-9 w-[9rem] mb-5"/>
            <Skeleton className="h-9 w-24 mb-5"/>
            <Skeleton className="h-9 w-20 mb-5"/>

          </div>
          <div className="sm:hidden">
            <DotsVerticalIcon className="w-5 m-2 -mt-3 h-5 animate-pulse text-primary/50"/>
          </div>
        </div>
        <Card className="md:grid grid-cols-3 overflow-hidden">
          <Card className="h-[12rem] animate-pulse m-5 md:w-full md:h-auto bg-primary/10"/>
          <CardContent className="p-5 ml-0 pt-0 sm:pt-5 sm:ml-5 col-span-2">
            <div className="grid gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Project Name
                </p>
                <p className="text-sm font-medium">
                  <Skeleton className="h-3.5 w-56 mt-1.5"/>
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground ">
                  Description
                </p>
                <div className="hidden sm:flex flex-col ">
                  <Skeleton className="h-3.5 mt-1.5"/>
                  <Skeleton className="h-3.5 w-[30rem] mt-1.5"/>
                </div>
                <div className="sm:hidden">
                  <Skeleton className="h-3.5 mt-1.5"/>
                  <Skeleton className="h-3.5 mt-1.5"/>
                  <Skeleton className="h-3.5 w-64 mt-1.5"/>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Frameworks
                </p>
                  <Skeleton className="h-3.5 w-64 mt-1.5"/>

              </div>
              <div className="flex gap-10">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Priority
                  </p>
                  <p className="text-sm font-medium">
                  <Skeleton className="h-3.5 w-16 mt-1.5"/>
                  </p>
                </div>
                <div className=" sm:grid-cols-none">
                  <p className="text-sm text-muted-foreground">
                    Due Date
                  </p>
                  <p className="text-sm font-medium">
                  <Skeleton className="h-3.5 w-32 mt-1.5"/>

                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
                <div className="">
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>
                  <Skeleton className="h-3.5 w-20 mt-1.5"/>

                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Created
                  </p>
                  <p className="text-sm font-medium">
                  <Skeleton className="h-3.5 w-56 mt-1.5"/>

                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Updated
                </p>
                <p className="text-sm font-medium">
                  <Skeleton className="h-3.5 w-56 mt-1.5"/>

                </p>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
  );
};

export default ProjectDetailsPageSkeleton;
