
import axiosClient from './axiosClient'

const musicsAPI = {
    getMusic: ()=>{
        const url = '/musics'
        return axiosClient.get(url)
    },
    updateMusic: (id)=>{
        const url =`/musics/${id}`
        return axiosClient.put(url)
    },
    createMusic: (music) =>{
        const url = '/musics'
        return axiosClient.post(url,{music})
    }
}

export default musicsAPI