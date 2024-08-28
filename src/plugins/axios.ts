import axios from 'axios'

export default {
  //@ts-ignore
  install: (app) => {
    const token = localStorage.getItem('authToken')

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    axios.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response && error.response.status === 403) {
          app.config.globalProperties.$router.push({ name: 'Login' })
        }
        return Promise.reject(error.response.data)
      })
    app.config.globalProperties.$axios = axios
  }
}
