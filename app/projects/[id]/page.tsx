import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {labelDay} from "react-day-picker/src/contexts/DayPicker/labels";
import {Status} from "@prisma/client";
import {AspectRatioDemo} from "@/components/AspactRatioBox";
import ProjectDetailsActions from "@/app/projects/[id]/ProjectDetailsActions";

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
        <ProjectDetailsActions />
        <Card className="md:grid grid-cols-4">
           <Card className="h-[14rem]  m-5 md:w-full md:h-auto bg-muted">

            </Card>
          <CardContent className="mt-6 md:ml-6">

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
                  {project.framework}
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
              <div className="">
              <p className="text-sm text-muted-foreground">
                Status
              </p>
              <p className="text-sm font-medium flex gap-2 items-center">
                    <span className="relative flex h-3 w-3">
                      <span
                          className=" animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                {project.status}
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

          </CardContent>
        </Card>
      </div>

  );
};

export default ProjectDetailsPage;
