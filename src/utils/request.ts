import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const request = axios.create({
    // 使用相对路径，让请求通过 Vite 代理转发到后端
    // Vite 代理配置：/api/travel -> http://127.0.0.1:3300
    baseURL: '/api/travel',
    timeout: 200000,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    config => {
        return config
    },

    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export function post<T extends object>(url: string, data: T, config?: AxiosRequestConfig) {
    return request.post(url, data, config)
}

export function get<P = any, R = any>(url: string, params?: P): Promise<AxiosResponse<R>> {
    return request.get(url, { params });
}

/** 处理流式接口 */
export async function fetchStream(url: string, data: any, onChunk: (chunk: any) => void, onComplete: () => void, onError: (error: any) => void) {
    /** 请求控制器 */
    const controller = new AbortController();

    try {
        const response = await fetch(`/api/travel/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: controller.signal
        })
        // const response = await post('/chat', data, {
        //     responseType: 'stream',  // 关键配置
        //     signal: controller.signal
        // });

        /** 获取响应体 */
        const reader = response.body?.getReader() // fetch
        // const reader = response.data?.getReader() // axios
        /** 将二进制数据解码为字符串 */
        const decoder = new TextDecoder()

        while (true) {
            if (!reader) break;
            const { done, value } = await reader?.read()
            if (done) break;
            console.log('value', value)

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n').filter(line => line.trim())
            console.log(lines)

            for (const line of lines) {
                console.log(line)
                try {
                    /** 判断开头是否为流式输出的格式 */
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.substring(6)
                        const jsonData = JSON.parse(jsonStr)
                        if (jsonData.type === 'chunk') {
                            onChunk(jsonData.content)
                        } else if (jsonData.done) {
                            onComplete()
                        } else if (jsonData.error) {
                            onError(jsonData.error)
                        }
                    }
                } catch (error) {
                    onError('流式数据解析异常')
                }
            }
        }

        return controller.abort(); //所有请求完成后，终止流式读取
    } catch (error) {
        onError(error)
    }
}

