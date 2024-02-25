'use client';

import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface ChartDataItem {
  name: string;
  total: string;
}
const OverviewCard = ({ data }: { data: ChartDataItem[] }) => {
  return (
      <div className="">
        <Card className="">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Overview of current projects revenue.</CardDescription>
          </CardHeader>
          <CardContent className="p-2 py-0 pb-4 pl-0">
            <div>
              <ResponsiveContainer className="text-muted-foreground" width="100%" height={360}>
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
                  {/*<Tooltip cursor={{fill: "transparent"}}/>*/}
                  <Bar
                      dataKey="total"
                      className="fill-accent-foreground"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default OverviewCard;
