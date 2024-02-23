import prisma from "@/prisma/client";
import {Priority, Project, Status} from "@prisma/client";

export const getProjectCount = async () => {
  return await prisma.project.count();
};
export const getProjectCountByStatus = async (status: Status) => {
    return await prisma.project.count({
        where: {
            status: status
        }
    });
};
export const getProjectCountByPriority = async (priority: Priority) => {
    return await prisma.project.count({
        where: {
            priority: priority
        }
    });
};
export const getProjectCountFromYesterday = async () => {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  return await prisma.project.count({
    where: {
      createdAt: {
        gte: yesterday,
        lte: currentDate
      }
    }
  });
};
export const getProjectCountLast7Days = async (status?: Status) => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  return await prisma.project.count({
    where: {
      status: status,
      createdAt: {
        gte: sevenDaysAgo,
        lte: currentDate
      }
    }
  });
};
export const getProjectCountLast14Days = async (status?: Status) => {
  const currentDate = new Date();
  const fourteenDaysAgo = new Date(currentDate);
  fourteenDaysAgo.setDate(currentDate.getDate() - 14);

  return await prisma.project.count({
    where: {
      status: status,
      createdAt: {
        gte: fourteenDaysAgo,
        lte: currentDate
      }
    }
  });
};
export const getProjectTotalRevenue = async (status?: Status) => {
  const projects = await prisma.project.findMany({
    where: {
      status: status,
    },
    select: {
      budget: true,
    },
  });

  const totalBudget = projects.reduce((acc: { budget: string | null }, project) => {
    if (project.budget) {
      return { budget: acc.budget ? (parseFloat(acc.budget) + parseFloat(project.budget)).toString() : parseFloat(project.budget).toString() };
    }
    return acc;
  }, { budget: "0" });

  return totalBudget.budget;
};


export const calculateBudgetPercentageChange = (currentMonthTotal: number, lastMonthTotal: number) => {
  // Check for division by zero
  if (lastMonthTotal === 0) {
    return 0; // Return 0 if last month total is zero to avoid division by zero
  }

  // Calculate percentage change
  const percentageChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

  // Format to have only two digits after the decimal point
  return parseFloat(percentageChange.toFixed(2));
};

export const getProjectTotalRevenueLast30DaysPercentage = async (status?: Status) => {
  // Get the current date and the date 30 days ago
  const currentDate = new Date();
  const last30DaysDate = new Date(currentDate);
  last30DaysDate.setDate(currentDate.getDate() - 30);

  // Get projects created in the last 30 days
  const last30DaysProjects = await prisma.project.findMany({
    where: {
      status: status,
      AND: {
        createdAt: {
          gte: last30DaysDate,
          lte: currentDate,
        }
      }
    },
  });

  // Get projects created in the previous 30 days (30 to 60 days ago)
  const previous30DaysDate = new Date(last30DaysDate);
  previous30DaysDate.setDate(last30DaysDate.getDate() - 30);

  const previous30DaysProjects = await prisma.project.findMany({
    where: {
      status: status,
      AND: {
        createdAt: {
          gte: previous30DaysDate,
          lte: last30DaysDate,
        }
      }
    },
  });

  // Calculate total budget of the last 30 days
  const last30DaysTotalBudget = last30DaysProjects.reduce((acc: number, project: Project) => {
    if (project.budget) {
      return acc + parseFloat(project.budget);
    }
    return acc;
  }, 0);

  // Calculate total budget of the previous 30 days
  const previous30DaysTotalBudget = previous30DaysProjects.reduce((acc: number, project: Project) => {
    if (project.budget) {
      return acc + parseFloat(project.budget);
    }
    return acc;
  }, 0);

  // Calculate percentage change
  return calculateBudgetPercentageChange(last30DaysTotalBudget, previous30DaysTotalBudget);
};
