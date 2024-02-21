import React from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import EditProjectButton from "@/app/projects/[id]/EditProjectButton";
import DeleteProjectButton from "@/app/projects/[id]/DeleteProjectButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelectUser from "@/app/projects/[id]/AssigneeSelectUser";

const ProjectDetailsActions = async ({projectId}: { projectId: string }) => {
  const session = await getServerSession(authOptions)

  return (
      <div className="flex justify-between items-center">
        <CardHeader className="p-0 my-5">
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Explore detailed project information.</CardDescription>
        </CardHeader>
        {session && (
            <div>
              <div className="hidden sm:flex gap-3">
                <AssigneeSelectUser/>
                <EditProjectButton projectId={projectId}/>
                <DeleteProjectButton projectId={projectId}/>
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
                        <AssigneeSelectUser/>
                        <DrawerClose asChild>
                          <EditProjectButton projectId={projectId}/>
                        </DrawerClose>
                        <DeleteProjectButton projectId={projectId}/>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
        )}
      </div>
  );
};

export default ProjectDetailsActions;
