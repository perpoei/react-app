export type TimeSlot = {
    name: times;      // 枚举 times 的值
    type: tagColor;   // 枚举 tagColor 的值
};

export interface PlanDataRequest {
    city: string;
    budget: number | string;
    days: number | string;
}