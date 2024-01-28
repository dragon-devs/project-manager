import React from 'react';
import {Project} from '@/types'; // Import the type for your Project model
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {AvatarIcon} from '@radix-ui/react-icons';
import {Badge} from '@/components/ui/badge';
import DueDate from '@/app/projects/_components/DueDate';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
  return (
      <div>
        <Card key={project.id} className="hover:ring-1 duration-500 transition-all">
          <CardHeader className="relative">
            <CardTitle className="mr-14 truncate ...">{project.name}</CardTitle>
            <CardDescription className="mr-14 truncate ...">{project.description}</CardDescription>
            <Avatar className="absolute right-5 top-5">
              <AvatarFallback>
                DRH
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            {project.frameworks.map((framework, index) => (
              <span key={index}>{framework} </span>
          ))}</CardContent>
          <CardFooter className="gap-1 justify-between">
            <Badge>{project.status}</Badge>
            <DueDate dueDate={project.dueDate}/>
          </CardFooter>
        </Card>
      </div>
  );
};

export default ProjectCard;
