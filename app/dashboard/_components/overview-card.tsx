'use client';

import React, {useEffect, useState} from 'react';
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import axios from "axios";
import {RecentProjects} from "@/app/dashboard/_components/recent-projects";

const OverviewCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/projectsData/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        <Card className="">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Overview of current projects revenue.</CardDescription>
          </CardHeader>
          <CardContent className="p-2 py-0 pb-2 pl-0">
            <div>
              <ResponsiveContainer className="text-muted-foreground" width="100%" height={350}>
                <BarChart data={data}>
                  <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                  />
                  <YAxis
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip cursor={{fill: "transparent"}}/>
                  <Bar
                      dataKey="total"
                      className="fill-accent-foreground"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Overview of current projects revenue.</CardDescription>
          </CardHeader>
          <CardContent className="p-2 py-0 pb-2 pl-0">
            <div>
              <ResponsiveContainer className="text-muted-foreground" width="100%" height={350}>
                <BarChart data={data}>
                  <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                  />
                  <YAxis
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip cursor={{fill: "transparent"}}/>
                  <Bar
                      dataKey="total"
                      className="fill-accent-foreground"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 sm:col-auto lg:col-auto">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentProjects/>
          </CardContent>
        </Card>
      </div>
  );
};

export default OverviewCard;
