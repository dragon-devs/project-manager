import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Activity, AlertTriangle, Boxes, DollarSign} from "lucide-react";
import {
  getProjectCount,
  getProjectCountByStatus,
  getProjectCountLast14Days,
  getProjectCountLast7Days,
  getProjectTotalRevenue,
  getProjectTotalRevenueLast30DaysPercentage
} from "@/app/dashboard/projectCounts";

const DashboardCard = async () => {
  const count = await getProjectCount();
  const countLast7Days = await getProjectCountLast7Days();
  const countInProgress = await getProjectCountByStatus('IN_PROGRESS');
  const countLast14DaysInProgress = await getProjectCountLast14Days("IN_PROGRESS");
  const countNotStarted = await getProjectCountByStatus('NOT_STARTED');
  const countLast14DaysNotStarted = await getProjectCountLast14Days("NOT_STARTED");
  const totalRevenue = await getProjectTotalRevenue('COMPLETED');
  const lastMonthPercentage = await getProjectTotalRevenueLast30DaysPercentage("COMPLETED");
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium mr-3">
              <Link href="/projects/grid">Total Projects</Link>
            </CardTitle>
            <Boxes strokeWidth={1.5} className="w-5 h-5 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{count}</div>
            <p className="text-xs text-muted-foreground">
              +{countLast7Days} since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium mr-3">
              <Link href="/projects/grid?filter=NOT_STARTED">Not Started</Link>
            </CardTitle>
            <AlertTriangle strokeWidth={1.5} className="w-5 h-5 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{countNotStarted}</div>
            <p className="text-xs text-muted-foreground">
              +{countLast14DaysNotStarted} since last 2 weeks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium mr-3">
              <Link href="/projects/grid?filter=IN_PROGRESS">In Progress</Link>
            </CardTitle>
            <Activity strokeWidth={1.5} className="w-5 h-5 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{countInProgress}</div>
            <p className="text-xs text-muted-foreground">
              +{countLast14DaysInProgress} since last 14 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium mr-3">
              Total Revenue
            </CardTitle>
            <DollarSign strokeWidth={1.5} className="w-5 h-5 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              %{lastMonthPercentage} from last month
            </p>
          </CardContent>
        </Card>
      </div>
  );
};

export default DashboardCard;
