import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import { initialState, rootReducer } from './reducers/rootReducer';

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


