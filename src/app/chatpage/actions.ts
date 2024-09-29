'use server'

import { headers } from "next/headers"

export const getUserLocation = async () => {
    const hs = headers()
    console.log(hs)

    return hs.get("x-vercel-ip-city")
}