import React from 'react';
import DashboardCard from "@/app/dashboard/_components/dashboard-card";
import OverviewCard from "@/app/dashboard/_components/overview-card";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {RecentProjects} from "@/app/dashboard/_components/recent-projects";
import {getProjectCountByPriority, getProjectCountLastDays, getTotalBudgetForDay} from "@/app/dashboard/projectsData";
import {NextComponentType} from "next";


const Dashboard: NextComponentType = async () => {
  const chartData = await getTotalBudgetForDay();
  const days = await getProjectCountLastDays(30);
  const low = await getProjectCountByPriority("LOW");
  const normal = await getProjectCountByPriority("NORMAL");
  const high = await getProjectCountByPriority("HIGH");
  const critical = await getProjectCountByPriority("CRITICAL");
  const prioritiesData = [
    {name: "Low", total: low.toString()},
    {name: "Normal", total: normal.toString()},
    {name: "High", total: high.toString()},
    {name: "Critical", total: critical.toString()},
  ]

  return (
      <div className="flex flex-col gap-3 sm:gap-5">
        <DashboardCard/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          <OverviewCard title="Overall Weekly Revenue" description="Check out the project budgets from last week."
                        data={chartData}/>
          <OverviewCard title="Prioritized Overview" description="Get a quick overview of top priorities." formatter=""
                        data={prioritiesData}/>
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
export default Dashboard;
