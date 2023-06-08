/* eslint-disable no-undef */
import axios from 'axios'
import queryString from 'query-string'

const publicClient = axios.create({
    paramsSerializer: {
        encode: (params) => queryString.stringify(params)
    }
})

publicClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
})

publicClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data
        return response
    },
    (err) => {
        throw err.response.data
    }
)

export default publicClient
