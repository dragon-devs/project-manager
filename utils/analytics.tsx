import {redis} from "@/lib/redis"
import {getDate} from "@/utils/index";
import {parse} from "date-fns";

type AnalyticsArgs = {
    retention?: number
}

interface TrackOptions {
    persist?: boolean
}

export class Analytics {
    private readonly retention: number = 60 * 60 * 24 * 7

    constructor(opts?: AnalyticsArgs) {
        if (opts?.retention) this.retention = opts.retention
    }

    async track(namespace: string, event: object = {}, opts?: TrackOptions) {
        let key = `analytics::${namespace}`

        if (!opts?.persist) {
            key += `::${getDate()}`
        }

        await redis.hincrby(key, JSON.stringify(event), 1)
        if (!opts?.persist) await redis.expire(key, this.retention)
    }

    async retrieveDays(namespace: string, nDays: number) {
        type AnalyticsPromise = ReturnType<typeof analytics.retrieve>
        const promises: AnalyticsPromise[] = []

        for (let i = 0; i < nDays; i++) {
            const formattedData = getDate(i)
            const promise = analytics.retrieve(namespace, formattedData)
            promises.push(promise)
        }
        const fetched = await Promise.all(promises)
        return fetched.sort((a, b) => {
            if (
                parse(a.date, "dd/MM/yyyy", new Date()) >
                parse(b.date, "dd/MM/yyyy", new Date())
            ) {
                return 1
            } else {
                return -1
            }

        })

    }

    async retrieve(namespace: string, date: string) {
        const res = await redis.hgetall(`analytics::${namespace}::${date}`)
        return {
            date,
            events: Object.entries(res ?? []).map(([key, value]) => ({
                [key]: Number(value)
            }))
        }
    }
}

export const analytics = new Analytics();
