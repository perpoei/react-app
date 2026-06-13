enum Times {
    上午 = "上午",
    下午 = "下午",
    晚上 = "晚上"
}

export enum TagColor {
    上午 = 'warning',
    下午 = 'primary',
    晚上 = 'success'
}

export const timeSlot = [
    {
        name: Times.上午,
        type: TagColor.上午
    },
    {
        name: Times.下午,
        type: TagColor.下午
    },
    {
        name: Times.晚上,
        type: TagColor.晚上
    }
]

export enum BudgetList {
    accommodation = '住宿',
    food = '餐饮',
    transportation = '交通',
    tickets = '门票',
    other = '其他',
    notes = '备注'
}

export enum BudgetType {
    备注 = 'notes',
}