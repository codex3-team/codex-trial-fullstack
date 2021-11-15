import axios from 'axios'

export const codexContextPath = '/codex/api'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
)

const errorHandler = (error: any) => {
    return Promise.reject(error)
}

const requestHandler = async (request: any) => {
    request.baseURL = 'http://localhost:8008'
    return request
}

export default axiosInstance