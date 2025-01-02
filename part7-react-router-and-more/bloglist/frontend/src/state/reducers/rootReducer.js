import blogReducer from './blogReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

const initialState = {
    blogs: [],
    notification: {
        title: ''
    },
    user: {}
}

const rootReducer = (state = initialState, action) => ({
    blogs: blogReducer(state.blogs, action),
    notification: notificationReducer(state.notification, action),
    user: userReducer(state.user, action)
})

export {initialState, rootReducer}