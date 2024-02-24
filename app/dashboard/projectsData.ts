import prisma from "@/prisma/client";
import {Status, Project, Priority} from "@prisma/client";

export const getProjectCount = async () => await prisma.project.count();

export const getProjectCountByStatus = async (status: Status) =>
    await prisma.project.count({where: {status}});

export const getProjectCountByPriority = async (priority: Priority) =>
    await prisma.project.count({where: {priority}});

export const getProjectCountFromYesterday = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return await prisma.project.count({
    where: {createdAt: {gte: yesterday}}
  });
};

export const getProjectCountLastDays = async (days: number, status?: Status) => {
  const date = new Date();
  const daysAgo = new Date(date);
  daysAgo.setDate(date.getDate() - days);

  return await prisma.project.count({
    where: {
      status,
      createdAt: {gte: daysAgo}
    }
  });
};

export const getProjectTotalRevenue = async (status?: Status) => {
  const projects = await prisma.project.findMany({
    where: {status},
    select: {budget: true}
  });
  const totalBudget = projects.reduce((acc, project) => acc + parseFloat(project.budget || '0'), 0);

  return totalBudget.toFixed(2);
};


const calculatePercentageChange = (currentTotal: number, lastTotal: number): number => {
  if (lastTotal === 0) return 0;
  return parseFloat(((currentTotal - lastTotal) / lastTotal * 100).toFixed(2));
};
const getTotalBudgetForPeriod = async (status: Status | undefined, startDate: Date, endDate: Date): Promise<number> => {
  const projects = await prisma.project.findMany({
    where: {status, createdAt: {gte: startDate, lte: endDate}},
    select: {budget: true}
  });

  return projects.reduce((acc, project) => acc + parseFloat(project.budget || '0'), 0);
};
export const getProjectTotalRevenueLast30DaysPercentage = async (status?: Status): Promise<number> => {
  try {
    const currentDate = new Date();
    const last30DaysDate = new Date(currentDate);
    last30DaysDate.setDate(currentDate.getDate() - 30);

    const previous30DaysDate = new Date(last30DaysDate);
    previous30DaysDate.setDate(last30DaysDate.getDate() - 30);

    const [last30DaysTotalBudget, previous30DaysTotalBudget] = await Promise.all([
      getTotalBudgetForPeriod(status, last30DaysDate, currentDate),
      getTotalBudgetForPeriod(status, previous30DaysDate, last30DaysDate)
    ]);

    return calculatePercentageChange(last30DaysTotalBudget, previous30DaysTotalBudget);
  } catch (error) {
    console.error("Error calculating revenue change:", error);
    return 0; // Return 0 if an error occurs
  }
};
