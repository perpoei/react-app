import type { PlanDataRequest } from "@/types/detail";
import { post } from "@/utils/request";

export const travelPlan = (data: PlanDataRequest) => post('/recommend', data)