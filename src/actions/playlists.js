
export const setOpenPlaylists = (boolean) =>{
    return {
        type: 'SET_OPEN_PLAYLISTS',
        payload: boolean
    }
}
export const addYourPlaylists = (music) =>{
    return{
         type: 'ADD_YOUR_PLAYLISTS',
         payload: music
    }
}

export const removeYourPlaylists = (music) =>{
    return{
         type: 'REMOVE_YOUR_PLAYLISTS',
         payload: music
    }
}
export const listenedPlaylists = (music) =>{
    return{
        type: 'LISTENED_PLAYLISTS',
        payload: music
    }
}
