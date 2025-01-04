import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { clearConfirmation } from '../state/notificationSlice'

const ConfirmationDialog = ({ onConfirm }) => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.isConfirmation) {
      Swal.fire({
        title: notification.title,
        text: notification.text,
        icon: notification.icon ?? 'warning',
        showCancelButton: notification.showCancelButton ?? true,
        confirmButtonText: notification.confirmButtonText ?? 'Yes',
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm()
        }
        dispatch(clearConfirmation())
      })
    }
  }, [notification, dispatch, onConfirm])

  return null
}
ConfirmationDialog.propTypes = {
  onConfirm: PropTypes.func,
}

export default ConfirmationDialog
