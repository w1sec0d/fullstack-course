import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useAppContext } from '../state/useAppContext'

const ToastNotification = () => {
  const {state, dispatch} = useAppContext()
  const notification = state.notification
  console.log({notification});
  
  useEffect(()=>{
    if(notification.title && !notification.isConfirmation){    
        Swal.fire({
          title: notification.title,
          text: notification.text,
          icon: notification.icon ?? 'success',
          timer: notification.timer ?? 4000,
          toast: notification.isToast ?? true,
          position: notification.position ?? 'top-right',
          showConfirmButton: false
        }).then(() => {
          dispatch({
            type:"CLEAR_NOTIFICATION"
          })
        }
      )
    }
  }, [notification, dispatch])

  return null
}

export default ToastNotification