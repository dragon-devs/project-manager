import React from 'react';
import {Project} from '@/types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import DueDate from '@/app/projects/_components/DueDate';
import Statues from "@/app/projects/_components/Status";
import FrameworkList from "@/app/projects/_components/FrameworkList";
import Link from "next/link";
import Priorities from "@/app/projects/_components/PrioritySignals";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {EnvelopeClosedIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
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
            {project.assignedToUserId && (
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
