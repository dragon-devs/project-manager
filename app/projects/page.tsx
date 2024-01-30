import React from 'react';
import prisma from "@/prisma/client";
import ProjectActions from "@/app/projects/ProjectActions";
import ProjectCard from "@/app/projects/ProjectCard";
import Link from "next/link";

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
                    <ProjectCard key={project.id} project={project}/>
              ))}
            </div>
        )}
      </div>
  );
};

export const dynamic = 'force-dynamic';
export default ProjectPage;
