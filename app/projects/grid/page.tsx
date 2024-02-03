import React, {Suspense} from 'react';
import prisma from "@/prisma/client";
import ProjectActions from "@/app/projects/grid/ProjectActions";
import ProjectCard from "@/app/projects/grid/ProjectCard";
import {Priority, Status} from "@prisma/client";
import PaginationPage from "@/app/projects/_components/Pagination";
import delay from "delay";

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
            <p>No match found.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {projects.map((project) => (
                  <ProjectCard key={project.id} project={project}/>
              ))}
            </div>
        )}
        <PaginationPage itemCount={projectCount} pageSize={pageSize} currentPage={page}/>

      </div>
  );
};

const getPriorityProjects = async (priority: Priority, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const projects = await prisma.project.findMany({
    where: {
      priority,
    },
    orderBy: {
      priority: 'asc',
    },
    skip,
    take: pageSize,
  });

  // If there are fewer projects than the pageSize, adjust the take value
  const remainingProjects = pageSize - projects.length;
  if (remainingProjects > 0) {
    const additionalProjects = await prisma.project.findMany({
      where: {
        priority,
      },
      orderBy: {
        priority: 'asc',
      },
      skip: skip + pageSize, // Skip the projects already retrieved
      take: remainingProjects,
    });

    return [...projects, ...additionalProjects];
  }

  return projects;
};


const getStatusProjects = async (status: Status, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const projects = await prisma.project.findMany({
    where: {
      status,
    },
    orderBy: {
      status: 'asc',
    },
    skip,
    take: pageSize,
  });

  // If there are fewer projects than the pageSize, adjust the take value
  const remainingProjects = pageSize - projects.length;
  if (remainingProjects > 0) {
    const additionalProjects = await prisma.project.findMany({
      where: {
        status,
      },
      orderBy: {
        status: 'asc',
      },
      skip: skip + pageSize, // Skip the projects already retrieved
      take: remainingProjects,
    });

    return [...projects, ...additionalProjects];
  }

  return projects;
};

const getSearchProjects = async (q: string, page: number, pageSize: number) => {
  return prisma.project.findMany({
    where: q
        ? {
          OR: [
            {
              name: {
                mode: 'insensitive',
                contains: q,
              },
            },
            {
              description: {
                mode: 'insensitive',
                contains: q,
              },
            },
          ],
        }
        : {},
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
};

const getProjectCount = async (filter: Priority | Status, q: string) => {
  if (Object.values(Priority).includes(filter as Priority)) {
    return prisma.project.count({
      where: {
        priority: filter as Priority,
      },
    });
  } else if (Object.values(Status).includes(filter as Status)) {
    return prisma.project.count({
      where: {
        status: filter as Status,
      },
    });
  } else {
    return prisma.project.count({
      where: q
          ? {
            OR: [
              {
                name: {
                  mode: 'insensitive',
                  contains: q,
                },
              },
              {
                description: {
                  mode: 'insensitive',
                  contains: q,
                },
              },
            ],
          }
          : {},
    });
  }
};
export const dynamic = 'force-dynamic';
export default ProjectPage;
