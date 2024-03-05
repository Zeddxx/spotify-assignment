import useAuth from "../hooks/use-auth"
import { useDispatch } from "react-redux";
import { setToken } from "../redux/token";

const code = new URLSearchParams(window.location.search).get('code')

const Callback = () => {
  const { accessToken } = useAuth(code!);
  const dispatch = useDispatch()

  dispatch(setToken({ token: accessToken }))
  return (
    <div>
        {code}
    </div>
  )
}
export default Callback