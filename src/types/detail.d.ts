export type TimeSlot = {
    name: Times;      // 枚举 Times 的值
    type: TagColor;   // 枚举 TagColor 的值
};

export interface PlanDataRequest {
    city: string;
    budget: number | string;
    days: number | string;
}

// 每日行程中的景点详情
interface AttractionDetail {
  spot: string;           // 景点名称
  duration: string;       // 建议游玩时长
  ticket: string;         // 门票价格信息（可能含免费/联票说明）
  transportation: string; // 交通方式
  description?: string;   // 景点描述（可选，因为某些时段可能没有 description 字段，但你的数据中 evening 等都有，实际都有）
}

// 每日行程（一天包含上/下/晚三个时段）
interface DailyItinerary {
  day: number;                      // 天数序号
  date: string;                     // 日期描述，如 "第1天 - 抵京安顿与天安门广场周边"
  morning: AttractionDetail;
  afternoon: AttractionDetail;
  evening: AttractionDetail;
}

// 预算明细中的详细备注
interface DetailNotes {
  accommodation: string;
  food: string;
  transportation: string;
  tickets: string;
  other: string;
}

// 预算分解
interface BudgetBreakdown {
  accommodation: number;    // 住宿预算金额
  food: number;             // 餐饮预算
  transportation: number;   // 交通预算
  tickets: number;          // 门票预算
  other: number;            // 其他预算
  detailNotes: DetailNotes; // 各项详细说明
}

// 根返回对象
export interface TravelRecommendResponse {
  success: boolean;               // 是否成功
  city: string;                   // 城市名称
  days: number;                   // 行程天数
  totalBudget: number;            // 总预算（单位：元）
  dailyItinerary: DailyItinerary[]; // 每日行程列表
  budgetBreakdown: BudgetBreakdown; // 预算分解
  tips: string[];                 // 温馨提示列表
  warnings: string[];             // 注意事项列表
}