import type { PlanDataRequest } from "@/types/detail";
import { handleResponse } from "@/utils/https";
import { post } from "@/utils/request";

export const travelPlan = async (data: PlanDataRequest) => {
    const res = await post("/recommend", data)
    return handleResponse(res)
}