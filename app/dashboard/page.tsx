import React from 'react';
import DashboardCard from "@/app/dashboard/_components/dashboard-card";
import OverviewCard from "@/app/dashboard/_components/overview-card";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {RecentProjects} from "@/app/dashboard/_components/recent-projects";

const Dashboard = async () => {
  return (
      <div className="flex flex-col gap-3 sm:gap-5">
        <DashboardCard/>
        <OverviewCard/>

      </div>
  );
};
export const dynamic = 'force-dynamic';
export default Dashboard;
