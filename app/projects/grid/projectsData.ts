import {Priority, Status} from "@prisma/client";
import prisma from "@/prisma/client";

export const getPriorityProjects = async (priority: Priority, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const where = {priority}

  const projects = await prisma.project.findMany({
    where,
    orderBy: {
      priority: 'desc',
    },
    include: {
      assignedToUser: true
    },
    skip,
    take: pageSize,
  });

  const remainingProjects = pageSize - projects.length;
  if (remainingProjects > 0) {
    const additionalProjects = await prisma.project.findMany({
      where,
      orderBy: {
        priority: 'desc',
      },
      include: {
        assignedToUser: true
      },
      skip: skip + pageSize,
      take: remainingProjects,
    });

    return [...projects, ...additionalProjects];
  }

  return projects;
};

export const getStatusProjects = async (status: Status, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const where = {status}

  const projects = await prisma.project.findMany({
    where,
    orderBy: {
      status: 'desc',
    },
    include: {
      assignedToUser: true
    },
    skip,
    take: pageSize,
  });

  const remainingProjects = pageSize - projects.length;
  if (remainingProjects > 0) {
    const additionalProjects = await prisma.project.findMany({
      where: {
        status,
      },
      orderBy: {
        status: 'desc',
      },
      include: {
        assignedToUser: true
      },
      skip: skip + pageSize,
      take: remainingProjects,
    });

    return [...projects, ...additionalProjects];
  }

  return projects;
};

export const getSearchProjects = async (q: string, page: number, pageSize: number) => {
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
    include: {
      assignedToUser: true
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
};

export const getProjectCount = async (filter: Priority | Status, q: string) => {
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