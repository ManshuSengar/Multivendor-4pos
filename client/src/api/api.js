import axios from 'axios'
const local = 'http://142.93.71.196:8000'
const production = ''
const api = axios.create({
    baseURL: `${local}/api`,
    withCredentials : true
})
export default api