/* eslint-disable no-undef */
import axios from 'axios'
import queryString from 'query-string'

const privateShop = axios.create({
    paramsSerializer: {
        encode: (params) => queryString.stringify(params)
    }
})

privateShop.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('seller_token')}`
        }
    }
})

privateShop.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data
        return response
    },
    (err) => {
        throw err.response.data
    }
)

export default privateShop
