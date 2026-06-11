import axios from 'axios'
import type { AxiosResponse } from 'axios'

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

export function post<T extends object>(url: string, data: T) {
    return request.post(url, data)
}

export function get<P = any, R = any>(url: string, params?: P): Promise<AxiosResponse<R>> {
    return request.get(url, { params });
}

