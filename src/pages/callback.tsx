import useAuth from "../hooks/use-auth"
import { useDispatch } from "react-redux";
import { setToken } from "../redux/token";
import { useEffect } from "react";

const code = new URLSearchParams(window.location.search).get('code')

const Callback = () => {
  const { accessToken } = useAuth(code!);
  const dispatch = useDispatch()

  useEffect(() => {
    if(!accessToken) return;
    
    dispatch(setToken(accessToken))
  }, [dispatch, accessToken])

  return (
    <div>
        {code}
    </div>
  )
}
export default Callback