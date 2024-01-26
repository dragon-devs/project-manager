import React from 'react';
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import prisma from "@/prisma/client";
import {Badge} from "@/components/ui/badge";

interface Props {
  name: string;
  description: string;
  status: "OPEN" | "STUCK" | "IN_PROGRESS";
}

const ProjectPage = async () => {
  const projects = await prisma.project.findMany();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(project => (
          <Card key={project.id} className="hover:ring-1 flex-auto transition-all">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="truncate ...">
                {project.description}
                The description of the new project.
                The description of the new project.
                The description of the new project.
              </CardDescription>
            </CardHeader>
            <CardFooter className="gap-1 justify-between">
              <Badge className="bg-amber-300">{project.status}</Badge>
              <Badge className="bg-blue-300">{project.priority}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
