import React from 'react';
import {Project} from '@/types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import DueDate from '@/app/projects/_components/DueDate';
import Statues from "@/app/components/Status";
import FrameworkList from "@/app/projects/_components/FrameworkList";
import Link from "next/link";
import Priorities from "@/app/components/PrioritySignals";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {EnvelopeClosedIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge";
import UserProjectFeatures from "@/app/components/UserProjectFeatures";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = async ({project}) => {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user || null;

  const isAssignedToCurrentUser = project!.assignedToUserId === sessionUser?.id;

  return (
      <div>
        <Card key={project.id} className="hover:ring-[0.5px] ring-foreground duration-500 transition-all">
          <CardHeader className="relative">
            <CardTitle className="mr-12 text-md -mb-1 truncate ...">
              <Link href={`/projects/${project.id}`} className="focus:underline hover:underline">
                {project.name}
              </Link>
            </CardTitle>
            <CardDescription className="mr-10 truncate ...">{project.description}</CardDescription>
            {project.assignedToUser ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="absolute border right-5 top-5">
                      <AvatarImage src={project.assignedToUser?.image!}/>
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto">
                    <div className="flex flex-col space-y-4 items-center justify-center">

                      <div className="flex justify-center flex-col space-y-2">
                        <h4 className="text-sm font-semibold">{project.assignedToUser?.name}</h4>
                        <Badge className="text-[10px] w-20 justify-center">
                          {project.assignedToUser?.role}
                        </Badge>
                        <div className="flex items-center ">
                          <EnvelopeClosedIcon className="mr-2 h-4 w-4 opacity-70"/>{" "}
                          <span className="text-xs text-muted-foreground">
                            {project.assignedToUser?.email}
                            </span>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
            ) : (
                <div className="absolute right-6 top-6">
                  {isAssignedToCurrentUser && <UserProjectFeatures project={project}/>}
                </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="overflow-hidden w-[85%]">
                <FrameworkList frameworks={project.frameworks}/>
              </div>
              <Priorities priority={project.priority}/>
            </div>
          </CardContent>
          <CardFooter className="gap-1 justify-between">
            <Statues className="text-xs" status={project.status}/>
            <DueDate dueDate={project.dueDate}/>
          </CardFooter>
        </Card>
      </div>
  );
};

export default ProjectCard;
