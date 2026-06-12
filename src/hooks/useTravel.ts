import { travelPlan } from "@/api/detail"
import type { PlanDataRequest, TravelRecommendResponse } from "@/types/detail"
import { useState } from "react"


export const useTravel = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [planData, setPlanData] = useState<TravelRecommendResponse>()
    const [errMsg, setErrMsg] = useState<string>("")

     /** 获取行程规划 */
    const getTravelPlan = async (data: PlanDataRequest) => {
       setLoading(true)
       const res = await travelPlan(data)
       res.data.success ? setPlanData(res.data) : setErrMsg(res.data.error)
       setLoading(false)
    }

    return {
        loading,
        errMsg,
        setLoading,
        planData,
        setPlanData,
        getTravelPlan
    }
}