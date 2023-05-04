import axios from 'axios'
import store from '../app/store'
import useRefreshToken from '../hooks/useRefreshToken'

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true,
})

axiosPrivate.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosPrivate.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response?.status === 403 && !originalRequest.sent) {
      originalRequest.sent = true
      const newAccessToken = await useRefreshToken()
      store.dispatch({ type: 'INSERT_TOKEN', payload: newAccessToken })
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return axiosPrivate(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default axiosPrivate
