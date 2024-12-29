const initialState = []

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return {notification: action.notification}

        case 'CLEAR_NOTIFICATION':
            return initialState
    
        default:
            return 
    }
}

export default blogReducer