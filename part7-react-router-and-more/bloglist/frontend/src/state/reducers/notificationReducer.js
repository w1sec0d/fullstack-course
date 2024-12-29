const initialState = {
    title: ''
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {notification: action.notification}

        case 'CLEAR_NOTIFICATION':
            return initialState
    
        default:
            return 
    }
}

export default notificationReducer