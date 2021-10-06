
const initialState = {
    runningMusic: [],
    musics: [] ,
    searchMusics: [],
    isRunning: false
}

const musicReducer = (state = initialState, action) =>{
  
    switch(action.type){
        case 'SET_RUNNING': {
            const newRunningMusic = [...state.runningMusic]
            newRunningMusic.splice(0,state.runningMusic.length)
            newRunningMusic.push(action.payload)
            return {
                ...state,
                runningMusic: newRunningMusic
            }
        }
        case 'REMOVE_RUNNING':{
            const newRunningMusic = [...state.runningMusic]
            newRunningMusic.splice(0,state.runningMusic.length)
            return{
                ...state,
                runningMusic: newRunningMusic
            }
        }
        case 'GET_DATA_MUSICS':{
            return {
                ...state,
                musics: action.payload
            }
        }
        case 'SEARCH_MUSICS':{
            const search = action.payload
            var listMusics = [...state.musics]
            console.log(search.length)
            if(search.length > 1 ){
                listMusics= state.musics.filter((music)=>{
                    return music.name.toLowerCase().indexOf(search) !==-1
                })
            }
            else{
                listMusics = []
            }
            return{
                ...state,
                searchMusics: listMusics
            }
        }
        case 'IS_RUNNING':{
            return {
                ...state,
                isRunning: action.payload
            }
        }
        
        default:
            return state
    }
}
export default musicReducer