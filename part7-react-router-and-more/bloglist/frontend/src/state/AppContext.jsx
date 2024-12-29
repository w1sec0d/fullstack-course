import PropTypes from 'prop-types';
import { createContext, useReducer, useContext } from 'react';
import { initialState, rootReducer } from './reducers/rootReducer';

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

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


