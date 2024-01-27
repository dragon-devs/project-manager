import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import prisma from "@/prisma/client";
import {Badge} from "@/components/ui/badge";
import ProjectActions from "@/app/projects/ProjectActions";
import DueDate from "@/app/projects/_components/DueDate";

const ProjectPage = async () => {
  const projects = await prisma.project.findMany();

  return (
      <div className="space-y-5">
        <ProjectActions/>
        {projects.length === 0 ? (
            <p>No projects available.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map(project => (
                  <Card key={project.id} className="hover:ring-1 duration-500 transition-all">
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription className="truncate ...">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter className="gap-1 justify-between">
                      <Badge >{project.status}</Badge>
                      <DueDate dueDate={project.dueDate!} />
                    </CardFooter>
                  </Card>
              ))}
            </div>
        )}
      </div>
  );
};

export const dynamic = 'force-dynamic';
export default ProjectPage;
