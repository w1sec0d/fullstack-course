import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return initialState
        },
        setConfirmation(state, action) {
            return { ...action.payload, isConfirmation: true }
        },
        clearConfirmation() {
            return { ...initialState, isConfirmation: false }
        }
    }
})

export const { setNotification, clearNotification, setConfirmation, clearConfirmation } = notificationSlice.actions
export default notificationSlice.reducer