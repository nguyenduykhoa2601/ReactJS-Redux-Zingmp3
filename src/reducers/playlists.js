const initialState = {
    isOpen : false,
    yourPlaylists: [],
    listenedPlayLists:  []
}

const playlistsReducer = (state=initialState , action)=>{
    switch(action.type){
        case 'SET_OPEN_PLAYLISTS':{
            return {
                ...state,
                isOpen: action.payload
            } 
        }
        case 'ADD_YOUR_PLAYLISTS':{
            const newYourPlaylists = [...state.yourPlaylists]
            const newMusic = action.payload
            const isExist = newYourPlaylists.filter(item=>item.id === newMusic.id)
            if (isExist.length === 0){
                newYourPlaylists.push(action.payload)
            }
            return {
                ...state,
                yourPlaylists: newYourPlaylists
            }
        }
        case 'REMOVE_YOUR_PLAYLISTS':{
         
            var newYourPlaylists = state.yourPlaylists.filter(music=>music.id !== action.payload.id)
            
            return {
                ...state,
                yourPlaylists: newYourPlaylists
            }
        }
        case 'LISTENED_PLAYLISTS':{
            const newListenedPlaylists = [...state.listenedPlayLists]
            const newMusic = action.payload
            const isExist = newListenedPlaylists.filter(item=>item.id===newMusic.id)
            if(isExist.length === 0){
                newListenedPlaylists.push(newMusic)
            }
            
            return{
                ...state,
                listenedPlayLists: newListenedPlaylists
            }
        }
        default:
            return state
    }

}
export default playlistsReducer;