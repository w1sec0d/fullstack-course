import blogReducer from './blogReducer';
import notificationReducer from './notificationReducer';

const initialState = {
    blogs: [],
    notification: {
        title: ''
    }
}

const rootReducer = (state = initialState, action) => ({
    blogs: blogReducer(state.blogs, action),
    notification: notificationReducer(state.notification, action)
})

export {initialState, rootReducer}