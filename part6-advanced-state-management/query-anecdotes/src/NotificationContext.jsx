import { useReducer, createContext, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;

    case "REMOVE_NOTIFICATION":
      return "";

    default:
      return state;
  }
};

const NotificationContext = createContext()

const NotificationContextProvider = ({children}) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");
  return <NotificationContext.Provider value={[notification, notificationDispatch]}>
    {children}
  </NotificationContext.Provider>
  
};
export default NotificationContextProvider

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}
