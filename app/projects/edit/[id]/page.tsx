import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {ProjectForm} from "@/app/projects/_components/ProjectForm";
import delay from "delay";

interface Props{
  params: {id: string}
}
const EditProjectPage = async ({params}: Props) => {
  const project = await prisma.project.findUnique({
    where: {id: params.id}
  });
  if (!project)
    return notFound();
  await delay(2000)
  return (
      <div>
        <ProjectForm project={project}/>
      </div>
  );
};

export default EditProjectPage;
