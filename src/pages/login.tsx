import { useEffect } from "react"
import LoginButton from "../components/auth/login-button"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const getToken = localStorage.getItem('accessToken');

    if(!getToken) return;

    navigate('/home')
  }, [navigate])
  return (
    <div className="">
        <LoginButton />
    </div>
  )
}
export default Login