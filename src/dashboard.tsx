import { useEffect } from "react"
import useAuth from "./hooks/use-auth"

const Dashboard = ({ code } : { code: string }) => {
  const { accessToken } = useAuth(code)

  useEffect(() => {
    if(!accessToken) return;

    async function fetchSearchResults(token: string) {
        const result = await fetch('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await result.json()
        console.log({ data });
    }
    fetchSearchResults(accessToken)
  }, [accessToken])
  return (
    <div>Dashboard</div>
  )
}
export default Dashboard