'use client';

import React from 'react';
import {BarChart} from "@tremor/react";
import {analytics} from "@/utils/analytics";
import ReactCountryFlag from "react-country-flag";
import {ArrowDownRight, ArrowRight, ArrowUpRight} from "lucide-react";
import {Card} from "@/components/ui/card";

interface AnalyticsDashboardProps {
    avgVisitorsPerDay: string
    amtVisitorsToday: number
    timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>
    topCountries: [string, number][]
}

const Badge = ({percentage}: { percentage: number }) => {
    const isPositive = percentage > 0
    const isNeutral = percentage === 0
    const isNegative = percentage < 0

    if (isNaN(percentage)) return null

    const positiveClassname = 'bg-green-900/25 text-green-400 ring-green-400/25'
    const neutralClassname = 'bg-zinc-900/25 text-zinc-400 ring-zinc-400/25'
    const negativeClassname = 'bg-red-900/25 text-red-400 ring-red-400/25'
    return (
        <span className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset 
        ${isPositive ? positiveClassname : isNeutral ? neutralClassname : negativeClassname}`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3"/> : null}
            {isNeutral ? <ArrowRight className="h-3 w-3"/> : null}
            {isNegative ? <ArrowDownRight className="h-3 w-3"/> : null}
            {percentage.toFixed(0)}%
        </span>
    )

}
const AnalyticsDashboard = ({
                                avgVisitorsPerDay,
                                amtVisitorsToday,
                                timeseriesPageviews,
                                topCountries
                            }: AnalyticsDashboardProps) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-5 w-full mx-auto max-w-xs">
                    <p className="text-tremor-default text-dark-tremor-content">Avg. visitors/day</p>
                    <p className="text-3xl text-dark-tremor-content-strong font-semibold">
                        {avgVisitorsPerDay}
                    </p>
                </Card>
                <Card className="p-5 w-full mx-auto max-w-xs">
                    <p className="flex gap-2.5 items-center text-tremor-default text-dark-tremor-content">
                        Visitors Today
                        <Badge percentage={(amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100}/>
                    </p>
                    <p className="text-3xl text-dark-tremor-content-strong font-semibold">
                        {amtVisitorsToday}
                    </p>
                </Card>

            </div>
            <Card className="p-5 flex flex-col sm:grid grid-cols-4 gap-6">
                <h2 className="w-full text-dark-tremor-content-strong text-center sm:left-left font-semibold text-xl">
                    This weeks top visitors:
                </h2>
                <div className="col-span-3 flex items-center justify-between flex-wrap gap-8">
                    {topCountries?.map(([topCountry, number]) => {
                        return <div key={number} className="flex items-center gap-3 text-dark-tremor-content-strong">
                            <p className="hidden sm:block text-tremor-content">
                                {topCountry}
                            </p>
                            <ReactCountryFlag className="text-5xl sm:text-3xl" svg countryCode={topCountry}/>
                            <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                                {number}
                            </p>
                        </div>
                    })}
                </div>
            </Card>
            <Card className="p-5">
                {timeseriesPageviews ? (
                    <BarChart
                        allowDecimals={false}
                        showAnimation
                        data={timeseriesPageviews.map((day) => ({
                            name: day.date,
                            Visitors: day.events.reduce((acc, curr) => {
                                return acc + Object.values(curr)[0]!
                            }, 0),
                        }))}
                        categories={["Visitors"]}
                        index="name"
                    />) : null}
            </Card>
        </div>
    );
};

export default AnalyticsDashboard;