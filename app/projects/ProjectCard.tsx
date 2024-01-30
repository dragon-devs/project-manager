import React from 'react';
import {Project} from '@/types'; // Import the type for your Project model
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import DueDate from '@/app/projects/_components/DueDate';
import Statues from "@/app/projects/_components/Status";
import FrameworkList from "@/app/projects/_components/FrameworkList";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
  return (
      <div>
        <Card key={project.id} className="hover:ring-1 duration-500 transition-all">
          <CardHeader className="relative">
            <CardTitle className="mr-14 text-md -mb-1 truncate ...">
              <Link href={`/projects/${project.id}`} className="focus:underline hover:underline">
                {project.name}
              </Link>
            </CardTitle>
            <CardDescription className="mr-14 truncate ...">{project.description}</CardDescription>
            <Avatar className="absolute right-5 top-5">
              <AvatarFallback>
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <FrameworkList frameworks={project.frameworks} />
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
