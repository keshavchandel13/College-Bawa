import axios from 'axios'
const api = axios.create({
    baseURL:`${import.meta.env.VITE_APP_BACKEND_URL}`,
     headers: { 'Content-Type': 'application/json' }
})

// Req. Interceptor attached with jwt
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;

},
(err)=>{
 return Promise.reject(err)
}
)

// res. interceptor to handle token exipry
api.interceptors.response.use((response)=>{
    return response
},
(error)=>{
    if(error.response?.status===401){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    return Promise.reject(error)
}
)

export default api;