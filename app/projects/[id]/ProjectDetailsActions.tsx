import React from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Project} from "@prisma/client";
import EditProjectButton from "@/app/projects/[id]/EditProjectButton";
import DeleteProjectButton from "@/app/projects/[id]/DeleteProjectButton";
import {
  Drawer, DrawerClose,
  DrawerContent,
  DrawerDescription, DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {DotsHorizontalIcon, DotsVerticalIcon} from "@radix-ui/react-icons";

const ProjectDetailsActions = ({projectId}: { projectId: string }) => {
  return (
      <div className="flex  justify-between ">
        <CardHeader className="p-0 mb-5">
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Explore detailed project information.</CardDescription>
        </CardHeader>
        <div className="hidden sm:flex gap-3">
          <DeleteProjectButton projectId={projectId}/>
          <EditProjectButton projectId={projectId}/>
        </div>
        <div className="sm:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <DotsVerticalIcon className="w-5 m-2 h-5"/>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Project Options</DrawerTitle>
                  <DrawerDescription>Tap the screen or swipe it down.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DeleteProjectButton projectId={projectId}/>
                  <DrawerClose asChild>
                    <EditProjectButton projectId={projectId}/>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
  );
};

export default ProjectDetailsActions;
