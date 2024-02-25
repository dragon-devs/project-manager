import {NextRequest, NextResponse} from "next/server";
import {startOfDay, subDays} from 'date-fns';
import prisma from '@/prisma/client';

interface Props {
  params: { slug: string }
}

export async function GET(
    request: NextRequest,
    {params}: Props) {
  const slug = params.slug

  if (slug === 'data') {
    return await getTotalBudgetForDay();
  } else if (slug === 'recent-projects') {
    return await getRecentProjects();
  } else {
    return NextResponse.json({error: 'Method Not Allowed'}, {status: 405});
  }
}

const getTotalBudgetForDay = async () => {
  try {
    const today = new Date();
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const day = subDays(today, i);
      days.push(startOfDay(day));
    }

    const data = [];

    for (const day of days) {
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1); // Next day

      const projects = await prisma.project.findMany({
        where: {
          createdAt: {
            gte: day,
            lt: nextDay,
          },
        },
        select: {
          budget: true,
        },
      });

      const totalBudget = projects.reduce((acc, project) => acc + parseFloat(project.budget || '0'), 0);
      data.push({
        name: day.toLocaleDateString('en-US', {weekday: 'short'}),
        total: totalBudget.toFixed(2),
      });
    }
    return NextResponse.json(data, {status: 200});
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

export async function getRecentProjects() {
  try {
    const recentProjects = await prisma.project.findMany({
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(recentProjects);
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}