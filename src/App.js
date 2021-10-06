import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { getDataMusics } from './actions/music';
import musicsAPI from './api/musicsAPI';
import './App.css';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Menu from './components/Menu/Menu';
import Pagesearch from './components/PageSearch/PageSearch';
import PlayLists from './components/Playlists/PlayLists';
import Song from './components/Song/Song';
import TopMusics from './components/TopMusics/TopMusics';

function App() {
    const dispatch = useDispatch()
    const searchMusics = useSelector(state => state.music.searchMusics)
    const runningMusic = useSelector(state => state.music.runningMusic)
    const yourPlaylists = useSelector(state => state.playlists.yourPlaylists)
    const [tracks, setTracks] = useState([])
    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const res = await musicsAPI.getMusic()
                const action = getDataMusics(res)
                dispatch(action)
            } catch (error) {
                alert(error)
            }
        }
        fetchMusics()
    }, [])
    useEffect(() => {
        if (runningMusic.length !== 0) {
            setTracks(runningMusic)
        }
        else {
            setTracks([])
            setTracks(yourPlaylists)
        }

    }, [runningMusic, yourPlaylists])
    const styleDivSong = {
        bottom: tracks.length !== 0 ? 0 : '-100%'
    }

    const setTracksSong = () => {
        if (tracks) {
            if (tracks.length > 0) {
                return <Song tracks={tracks} />
            }
            return null
        }
        return null
    }
    return (
        <div className="App">
            <div className="container">
                <div className="div__menu">
                    <Menu />
                </div>
                <div className="div__mainPage" >
                    <Header />
                    {
                        searchMusics.length === 0 ?
                            <Switch>
                                <Route path="/" exact component={MainPage} />
                                <Route path="/top" exact component={TopMusics} />
                            </Switch> 
                            :
                            <Pagesearch />
                    }


                </div>
                <div className="div__playlists">
                    <PlayLists />
                </div>
                <div className="div__song" style={styleDivSong}>
                    {
                        setTracksSong()
                    }
                </div>


            </div>
        </div>
    );
}

export default App;
