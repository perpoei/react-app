import { travelPlan } from "@/api/detail"
import type { PlanDataRequest } from "@/types/detail"
import { useState } from "react"


export const useTravel = () => {
    const [planData, setPlanData] = useState()

     /** 获取行程规划 */
    const getTravelPlan = async (data: PlanDataRequest) => {
       const res = await travelPlan(data)
       console.log('res---', res)
    }

    return {
        planData,
        setPlanData,
        getTravelPlan
    }
}