import React from 'react';
import ProjectActions from "@/app/projects/grid/ProjectActions";
import {Priority, Status} from "@prisma/client";
import Pagination from "@/app/projects/_components/Pagination";
import ProjectCard from "@/app/components/ProjectCard";
import {
  getPriorityProjects,
  getProjectCount,
  getSearchProjects,
  getStatusProjects
} from "@/app/projects/grid/projectsData";

interface Props {
  searchParams: {
    filter: Priority | Status;
    q: string;
    page: string;
  };
}

const ProjectPage: React.FC<Props> = async ({searchParams}) => {
  const {filter, q} = searchParams;

  let projects;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 6;
  const projectCount = await getProjectCount(filter, q);

  if (Object.values(Priority).includes(filter as Priority)) {
    projects = await getPriorityProjects(filter as Priority, page, pageSize);
  } else if (Object.values(Status).includes(filter as Status)) {
    projects = await getStatusProjects(filter as Status, page, pageSize);
  } else {
    projects = await getSearchProjects(q, page, pageSize);
  }
  return (
      <div className="space-y-3 sm:space-y-5">
        <ProjectActions/>
        {projects.length === 0 ? (
            <div className="flex justify-center items-center ">
              <p>No projects available.</p>
            </div>) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {projects.map((project) => (
                  <ProjectCard key={project.id} project={project}/>
              ))}
            </div>
        )}
        <Pagination itemCount={projectCount} pageSize={pageSize} currentPage={page}/>
      </div>
  );
};

export const dynamic = 'force-dynamic';
export default ProjectPage;
