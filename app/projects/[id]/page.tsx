import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, CardContent} from "@/components/ui/card";
import ProjectDetailsActions from "@/app/projects/[id]/ProjectDetailsActions";
import Statues from "@/app/projects/_components/Status";

interface Props {
  params: { id: string }
}


const ProjectDetailsPage = async ({params}: Props) => {
  const project = await prisma.project.findUnique({
    where: {id: params.id}
  });
  if (!project)
    return notFound();

  return (
      <div className="">
        <ProjectDetailsActions projectId={project.id}/>
        <Card className="md:grid grid-cols-3">
          <Card className="h-[12rem] m-5 md:w-full md:h-auto bg-muted">

          </Card>
          <CardContent className="mt-6 col-span-2 md:ml-6">

            <div className="grid gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Project Name
                </p>
                <p className="text-sm font-medium">
                  {project.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Description
                </p>
                <p className="text-sm font-medium">
                  {project.description}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Frameworks
                </p>
                <p className="text-sm font-medium">
                  {project.frameworks.map((framework, index) => (
                      <span key={index}>{framework} </span>
                  ))}
                </p>
              </div>
              <div className="flex gap-10">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Priority
                  </p>
                  <p className="text-sm font-medium">
                    {project.priority}
                  </p>
                </div>
                <div className=" sm:grid-cols-none">
                  <p className="text-sm text-muted-foreground">
                    Due Date
                  </p>
                  <p className="text-sm font-medium">
                    {`${project.dueDate.toDateString()}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
                <div className="">
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>
                  <p className="text-md font-medium flex gap-2 items-center">
                    <Statues className="text-md dark:text-white" status={project.status}/>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Created
                  </p>
                  <p className="text-sm font-medium">
                    {`${project.createdAt.toDateString()} - ${project.createdAt.toLocaleTimeString()}`}
                  </p>
                </div>
              </div>
              <div>
                  <p className="text-sm text-muted-foreground">
                    Updated
                  </p>
                  <p className="text-sm font-medium">
                    {`${project.updatedAt.toDateString()} - ${project.updatedAt.toLocaleTimeString()}`}
                  </p>
                </div>
            </div>

          </CardContent>
        </Card>
      </div>

  );
};

export default ProjectDetailsPage;
