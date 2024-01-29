import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {ProjectForm} from "@/app/projects/_components/ProjectForm";

interface Props{
  params: {id: string}
}
const EditProjectPage = async ({params}: Props) => {
  const project = await prisma.project.findUnique({
    where: {id: params.id}
  });
  if (!project)
    return notFound();

  return (
      <div>
        <ProjectForm project={project}/>
      </div>
  );
};

export default EditProjectPage;
