import { createSlice } from '@reduxjs/toolkit';
import { setUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from '../utils/localStorage'

const initialState = getUserFromLocalStorage()

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser (state, action){
            setUserToLocalStorage(action.payload)
            return action.payload
        },
        clearUser () {
            removeUserFromLocalStorage()
            return null
        }
    }
})


export const {setUser, clearUser} = userSlice.actions
export default userSlice.reducer