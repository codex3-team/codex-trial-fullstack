import { Car } from "./car.interface";

export interface CarResponse {
    content: Car[],
    currentPage: number,
    totalPages: number,
    totalOfItems: number
}