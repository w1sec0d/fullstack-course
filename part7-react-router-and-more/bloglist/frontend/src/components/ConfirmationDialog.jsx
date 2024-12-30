import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import { useAppContext } from '../state/useAppContext'

const ConfirmationDialog = ({ onConfirm }) => {
  const {state, dispatch} = useAppContext()
  const notification = state.notification

  useEffect(() => {
    if (notification.isConfirmation) {
      Swal.fire({
        title: notification.title,
        text: notification.text,
        icon: notification.icon ?? 'warning',
        showCancelButton: notification.showCancelButton ?? true,
        confirmButtonText: notification.confirmButtonText ?? 'Yes',
        toast:false
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm()
        }
        dispatch({
          type:"CLEAR_NOTIFICATION"
        })
      })
    }
  }, [notification, dispatch, onConfirm])

  return null
}
ConfirmationDialog.propTypes = {
  onConfirm: PropTypes.func,
}

export default ConfirmationDialog