const initialState = []

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.payload

        case 'CLEAR_BLOGS':
            return initialState

        case 'ADD_BLOG': 
            return [...state, action.payload] 

        default:
            return state
    }
}

export default blogReducer