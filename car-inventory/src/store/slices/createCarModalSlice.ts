import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ModalState {
    showCreateCarModal: boolean,
}

const initialState = {
    showCreateCarModal: false,
} as ModalState

const createCarModalSlice = createSlice({
    name: 'createCarModalSlice',
    initialState,
    reducers: {
        setShowCreateCarModalState: (state, action: PayloadAction<boolean>) => {
            state.showCreateCarModal = action.payload
        },
    }
})

export const { setShowCreateCarModalState } = createCarModalSlice.actions
export const selectCreateCarModalState = (state: RootState) => state.createCarModalSlice.showCreateCarModal

export default createCarModalSlice.reducer
