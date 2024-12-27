import { createSlice } from '@reduxjs/toolkit';
const initialState = []

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setBlogs(state, action){
            console.log("set!");
            console.log(action.payload);
            return action.payload
        },
        clearBlogs(){
            return []
        },
        addBlog(state,action){
            return [...state, action.payload]
        }
    }
})

export const {setBlogs, clearBlogs, addBlog} = blogSlice.actions
export default blogSlice.reducer