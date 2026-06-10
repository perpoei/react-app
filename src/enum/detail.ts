enum times {
    上午 = "上午",
    下午 = "下午",
    晚上 = "晚上"
}

enum tagColor {
    上午 = 'warning',
    下午 = 'primary',
    晚上 = 'success'
}

export const timeSlot = [
    {
        name: times.上午,
        type: tagColor.上午
    },
    {
        name: times.下午,
        type: tagColor.下午
    },
    {
        name: times.晚上,
        type: tagColor.晚上
    }
] 