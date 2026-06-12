import type { AxiosResponse } from 'axios'

export const handleResponse = (res: AxiosResponse) => {
    const { data, status } = res;

    return {
        data, status
    }
}