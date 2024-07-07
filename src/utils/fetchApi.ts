import axios from "axios"

export const fetchApi = async() => {
    try {
        const data = await axios.get('https://376689ee81334657b291d79dcf252ffe.api.mockbin.io/')
        console.log(data)
    } catch (error) {
        console.log('Something went wrong!')
    }
}