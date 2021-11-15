import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCars } from '../../api/carsAPI'
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
interface CarSliceState {
    cars: CarResponse,
    fetchCarsStatus: Status,
    addCarsStatus: Status,
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
    addCarsStatus: Status.IDLE,
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
    }
})

export const { setFetchCarsStatus } = carSlice.actions

export const selectCars = (state: RootState): CarResponse => state.carSlice.cars
export const selectFetchCarsStatus = (state: RootState) => state.carSlice.fetchCarsStatus

export default carSlice.reducer