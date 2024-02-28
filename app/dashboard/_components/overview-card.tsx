'use client';

import {Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface ChartDataItem {
  name: string;
  total: string;
}

interface Props {
  title?: string;
  description?: string;
  formatter?: string;
  data: ChartDataItem[]
}

const OverviewCard = ({title = "Overview", description = "The description of the chart.", formatter = "$", data}: Props) => {
  return (
      <div>
        <Card className="">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="p-2  pl-0">
            <div>
              <ResponsiveContainer className="text-muted-foreground" width="100%" height={290}>
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
                      tickFormatter={(value) => `${formatter}${value}`}
                  />
                  {/*<Tooltip cursor={{fill: "transparent"}}/>*/}
                  <Bar
                      dataKey="total"
                      stackId="total"
                      className="fill-primary"
                  >
                    <LabelList dataKey="total" position="insideBottom"
                               className="sm:text-xs text-[10px] fill-background" fontWeight="bold"/>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
  )
};

export default OverviewCard;
