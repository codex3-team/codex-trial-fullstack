import { AxiosResponse } from 'axios'
import { CarPayload } from '../types/carPayload.interface'
import { CarResponse } from '../types/carResponse.interface'
import instance, { codexContextPath } from './axios'

const responseBody = (response: AxiosResponse) => response.data

export const getCars = (carPayload: CarPayload): Promise<CarResponse> => {
    const { page, size, sort } = carPayload
    return instance.get(`${codexContextPath}/v1/cars?page=${page}&size=${size}&sort=${sort}`).then(responseBody)
}