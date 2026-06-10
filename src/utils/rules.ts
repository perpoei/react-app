import type { Rule } from 'rc-field-form/es/interface';

// 统一配置所有字段的 rules
export const formRules = {
    city: [{ required: true, message: '请选择城市' }],
    budget: [
        { required: true, message: '请输入预算金额' },
        {
            validator: (_: Rule, value: string | undefined) => {
                // 允许为空（required 会处理），若有值则必须 >= 0
                if (value !== undefined && value !== '' && Number(value) <= 0) {
                    return Promise.reject(new Error('预算金额不能低于或者等于0'));
                }
                return Promise.resolve();
            },
        },
    ],
    days: [
        { required: true, message: '请输入天数' },
        {
            validator: (_: Rule, value: string | undefined) => {
                if (value !== undefined && value !== '') {
                    const num = Number(value);
                    if (num <= 0 || num > 30) {
                        return Promise.reject(new Error(`天数必须介于 0 和 30 之间`));
                    }
                }
                return Promise.resolve();
            },
        },
    ],
};