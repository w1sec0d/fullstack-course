import { createSlice } from '@reduxjs/toolkit';
const initialState = []

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setBlogs (state, action) {
            return action.payload
        },
        clearBlogs () {
            return []
        },
        addBlog (state, action) {
            return [...state, action.payload]
        },
        likeBlog (state, action) {
            const blogIndexToLike = state.findIndex(
                (blog) => blog.id === action.payload
            )
            state[blogIndexToLike].likes += 1
        },
        deleteBlog (state, action) {
            return state.filter((blog) => blog.id != action.payload)
        }
    }
})

export const {setBlogs, clearBlogs, addBlog, likeBlog, deleteBlog} = blogSlice.actions
export default blogSlice.reducer