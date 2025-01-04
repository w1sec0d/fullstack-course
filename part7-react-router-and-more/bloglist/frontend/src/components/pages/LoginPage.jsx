import LoginForm from '../LoginForm'
import ToastNotification from '../ToastNotification'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <LoginForm />
        <ToastNotification />
      </div>
    </div>
  )
}

export default LoginPage
