const initialState = {}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload

        case 'CLEAR_USER':
            return initialState

        default:
            return state
    }
}

export default userReducer