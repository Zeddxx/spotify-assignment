import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/token";

export default function useAuth(code: string) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState<number>();
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.location.assign(`/`);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, [code, dispatch]);

  useEffect(() => {
    if(!accessToken) return;
    dispatch(setToken(accessToken));
  }, [accessToken, dispatch])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          dispatch(setToken(res.data.accessToken))
          window.location.assign(`/?accessToken=${res.data.accessToken}`);
        })
        .catch(() => {
          window.location.href = "/login";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, dispatch]);

  return { accessToken };
}
