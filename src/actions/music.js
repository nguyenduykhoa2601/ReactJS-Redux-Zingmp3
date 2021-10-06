

export const setRunning = (music) =>{
    return {
        type: 'SET_RUNNING',
        payload: music
    }
}
export const removeRunning = (music) =>{
    return {
        type: 'REMOVE_RUNNING',
        payload: music
    }
}

export const getDataMusics = (musics) =>{
    return {
        type: 'GET_DATA_MUSICS',
        payload: musics
    }
}
export const searchMusics = (value)=>{
    return{
        type: 'SEARCH_MUSICS',
        payload: value
    }
}

export const isRunning = (boolean)=>{
    return{
        type: 'IS_RUNNING',
        payload: boolean
    }
}
