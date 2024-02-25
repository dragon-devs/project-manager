import React from 'react';
import DashboardCard from "@/app/dashboard/_components/dashboard-card";
import OverviewCard from "@/app/dashboard/_components/overview-card";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {RecentProjects} from "@/app/dashboard/_components/recent-projects";
import {getProjectCountLastDays, getTotalBudgetForDay} from "@/app/dashboard/projectsData";
import {NextComponentType} from "next";
import Example from "@/app/dashboard/_components/overview-card";


const Dashboard: NextComponentType = async () => {
  const chartData = await getTotalBudgetForDay();
  const days = await getProjectCountLastDays(30);

  return (
      <div className="flex flex-col gap-3 sm:gap-5">
        <DashboardCard/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          <OverviewCard data={chartData} />
          <OverviewCard data={chartData} />
          <Card className="md:col-span-2 sm:col-auto lg:col-auto">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                You&lsquo;ve got <b>{days}</b> new projects this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentProjects/>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};
export const dynamic = 'force-dynamic';
export default Dashboard;
