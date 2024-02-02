import React from 'react';
import {Project} from '@/types'; // Import the type for your Project model
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import DueDate from '@/app/projects/_components/DueDate';
import Statues from "@/app/projects/_components/Status";
import FrameworkList from "@/app/projects/_components/FrameworkList";
import Link from "next/link";
import {SignalIcon} from "lucide-react";
import Priorities from "@/app/projects/_components/PrioritySignals";

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
            <Avatar className="absolute right-5 top-5">
              <AvatarFallback>
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="overflow-hidden w-[85%]">
                <FrameworkList frameworks={project.frameworks}/>
              </div>
              <Priorities priority={project.priority} />
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
