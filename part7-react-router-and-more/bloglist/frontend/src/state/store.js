import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from "./NotificationSlice"

const store = configureStore({
    reducer: {
        notification: notificationReducer
    }
})

export default store