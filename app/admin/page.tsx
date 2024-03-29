import React from 'react';
import {analytics} from "@/utils/analytics";
import AnalyticsDashboard from "@/app/admin/AnalyticsDashboard";
import {getDate} from "@/utils";
import authOptions from "@/app/auth/authOptions";
import {getServerSession} from "next-auth";

const AdminPanel = async () => {
    const session = await getServerSession(authOptions);

    if (session!.user!.role !== "ADMIN")
        return <div className="text-center text-destructive">You are forbidden to access this page.</div>

    const TRACKING_DAYS = 7
    const pageviews = await analytics.retrieveDays("pageview", TRACKING_DAYS)

    const totalPageviews = pageviews.reduce((acc, curr) => {
        return acc + curr.events.reduce((acc, curr) => {
            return acc + Object.values(curr)[0]!
        }, 0)
    }, 0)

    const avgVisitorsPerDay = (totalPageviews / TRACKING_DAYS).toFixed(1)

    const amtVisitorsToday = pageviews
        .filter((ev) => ev.date === getDate())
        .reduce((acc, curr) => {
            return (
                acc + curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
            )
        }, 0)

    const topCountriesMap = new Map<string, number>()
    for (let i = 0; i < pageviews.length; i++) {
        const day = pageviews[i];
        if (!day) continue

        for (let j = 0; j < day.events.length; j++) {
            const event = day.events[j];
            if (!event) continue

            const key = Object.keys(event)[0]!
            const value = Object.values(event)[0]!

            const parsedKey = JSON.parse(key)
            const country = parsedKey?.country

            if (country) {
                if (topCountriesMap.has(country)) {
                    const prevValue = topCountriesMap.get(country)!
                    topCountriesMap.set(country, prevValue + value)
                } else {
                    topCountriesMap.set(country, value)
                }
            }
        }
    }
    const topCountries = [...topCountriesMap.entries()].sort((a, b) => {
        if (a[1] < b[1]) return -1
        else return 1
    }).slice(0, 5)

    return (
        <div className=" w-full py-6 flex justify-center items-center">
            <div className="relative w-full max-w-7xl mx-auto text-white">
                <AnalyticsDashboard
                    avgVisitorsPerDay={avgVisitorsPerDay}
                    amtVisitorsToday={amtVisitorsToday}
                    timeseriesPageviews={pageviews}
                    topCountries={topCountries}
                />
            </div>
        </div>
    );
};


export default AdminPanel;