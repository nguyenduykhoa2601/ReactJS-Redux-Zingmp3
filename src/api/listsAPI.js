
import axiosClient from './axiosClient'

const listsAPI = {
    getList: ()=>{
        const url = '/lists'
        return axiosClient.get(url)
    }
}

export default listsAPI