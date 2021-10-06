import { combineReducers } from "redux";
import musicReducer from "./music";
import playlistsReducer from "./playlists";

const rootReducer = combineReducers({
    music: musicReducer,
    playlists: playlistsReducer
})
export default rootReducer