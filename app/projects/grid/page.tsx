import React from 'react';
import prisma from "@/prisma/client";
import ProjectActions from "@/app/projects/grid/ProjectActions";
import ProjectCard from "@/app/projects/grid/ProjectCard";
import {Priority, Status} from "@prisma/client";

interface Props {
  searchParams: { filter: Priority | Status}
}

const ProjectPage: React.FC<Props> = async ({searchParams}) => {
  const { filter } = searchParams;

  let projects;

  if (filter in Priority) {
    // Use Prisma to fetch projects based on the filter
    projects = await prisma.project.findMany({
      where: {
        priority: filter as Priority,
      },
    });
  } else if (filter in Status) {
    // Use Prisma to fetch projects based on the filter
    projects = await prisma.project.findMany({
      where: {
        status: filter as Status,
      },
    });
  } else {
    projects = await prisma.project.findMany()
  }
  return (
      <div className="space-y-3 sm:space-y-5">
        <ProjectActions/>
        {projects.length === 0 ? (
            <p>No projects available.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {projects.map(project => (
                  <ProjectCard key={project.id} project={project}/>
              ))}
            </div>
        )}
      </div>
  );
};

export const dynamic = 'force-dynamic';
export default ProjectPage;
