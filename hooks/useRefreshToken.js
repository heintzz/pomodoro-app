import axios from 'axios'

export default async function useRefreshToken() {
  const res = await axios.get('http://localhost:3500/refresh', {
    withCredentials: true,
  })
  return res.data.accessToken
}
