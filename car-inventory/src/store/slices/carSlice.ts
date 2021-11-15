import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCars, postCar } from '../../api/carsAPI'
import { Car } from '../../types/car.interface'
import { CarPayload } from '../../types/carPayload.interface'
import { CarResponse } from '../../types/carResponse.interface'
import { Status } from '../../types/status.enum'
import { RootState } from '../store'

export const fetchCars = createAsyncThunk<CarResponse, CarPayload>(
    'cars/fetchCars',
    async (carPayload: CarPayload) => {
        const response = await getCars(carPayload)
        return response as CarResponse
    }
)

export const addCar = createAsyncThunk<Car, Car>(
    'car/addCar',
    async (car, thunkApi) => {
        try {
            const response = await postCar(car)
            return response?.data as Car
        } catch (error: any) {
            const response = JSON.parse(Buffer.from(error?.response.data).toString('utf8'))
            return thunkApi.rejectWithValue(response.errorMessage)
        }
    }
)
interface CarSliceState {
    cars: CarResponse,
    fetchCarsStatus: Status,
    addCarStatus: Status,
    error: string | null
}

const initialState: CarSliceState = {
    cars: {
        content: [],
        currentPage: 0,
        totalPages: 0,
        totalOfItems: 0
    } as CarResponse,
    fetchCarsStatus: Status.IDLE,
    addCarStatus: Status.IDLE,
    error: ''
}

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setFetchCarsStatus: (state, action: PayloadAction<CarSliceState["fetchCarsStatus"]>) => {
            state.fetchCarsStatus = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchCars.pending, (state) => {
            state.fetchCarsStatus = Status.LOADING
        })

        builder.addCase(fetchCars.fulfilled, (state, action) => {
            state.cars = action.payload
            state.fetchCarsStatus = Status.SUCCEEDED
        })

        builder.addCase(fetchCars.rejected, (state, action) => {
            state.fetchCarsStatus = Status.FAILED
            state.error = action.error as string
        })

        builder.addCase(addCar.pending, (state) => {
            state.addCarStatus = Status.LOADING
        })

        builder.addCase(addCar.fulfilled, (state, action) => {
            state.cars.content.unshift(action.payload)
            state.addCarStatus = Status.SUCCEEDED
        })

        builder.addCase(addCar.rejected, (state, action) => {
            state.addCarStatus = Status.FAILED
            state.error = action.error as string
        })
    }
})

export const { setFetchCarsStatus } = carSlice.actions

export const selectCars = (state: RootState): CarResponse => state.carSlice.cars
export const selectFetchCarsStatus = (state: RootState) => state.carSlice.fetchCarsStatus
export const selectAddCarsStatus = (state: RootState) => state.carSlice.addCarStatus

export default carSlice.reducer