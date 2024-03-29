import {Redis} from '@upstash/redis'

export const redis = new Redis({
    url: 'https://apn1-sensible-aardvark-34205.upstash.io',
    token: process.env.REDIS_KEY!,
})
