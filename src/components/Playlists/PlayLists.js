import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRunning } from '../../actions/music';
import { removeYourPlaylists, setOpenPlaylists } from '../../actions/playlists';
import Bassmusic from '../utils/BassMusic/BassMusic';
import './playlists.css';

const PlayLists = () => {
    const dispatch = useDispatch()
    const runningMusic = useSelector(state => state.music.runningMusic)
 
    const [currentMusic,setCurrentMusic] = useState([])
    const isOpenPlaylists = useSelector(state => state.playlists.isOpen)
    const listenedPlaylists = useSelector(state => state.playlists.listenedPlayLists)
    const yourPlaylists = useSelector(state => state.playlists.yourPlaylists)
    const [isPlaylists, setIsPlaylists] = useState(true)
    const [isAdd, setIsAdd] = useState(false)
    const [playlistsType, setPlaylistsType] = useState(yourPlaylists)
    useEffect(() => {
        if (isPlaylists) {
            setPlaylistsType(yourPlaylists)
        }
        else {
            setPlaylistsType(listenedPlaylists)
        }
    }, [yourPlaylists, listenedPlaylists, isPlaylists])
    useEffect(()=>{
        if(runningMusic.length!==0){
            setCurrentMusic(runningMusic)
        }
    },[currentMusic,runningMusic])
    const activeClass = (id)=>{
        if (currentMusic.length === 0){
            return "playlists__item"
        }
        else{
            const current = currentMusic[0]
            if(current.id === id){
                return "playlists__item playlists__item--active"
            }
        }
    }
    const isBass = (id)=>{
        if (currentMusic.length === 0){
            return ''
        }
        else{
            const current = currentMusic[0]
            if(current.id === id){
                return <Bassmusic />
            }
        }
    }
    const stylePlaylists = {
        right: isOpenPlaylists ? 0 : '-100%',

    }
    const handleRunning = (music) => {
        const action = setRunning(music)
        dispatch(action)
        
    }
    const handleClosePlaylists =()=>{
        const action = setOpenPlaylists(false)
        dispatch(action)
    }

    const removeMusic = (music)=>{
        const action = removeYourPlaylists(music)
        dispatch(action)
    }
    return (
        <div className="playlists" style={stylePlaylists} >
            <div className="playlists__header">
                <div className="playlists__header-title">
                    <div
                        className={isPlaylists ? "playlists__name-playlists playlists__name--active" : "playlists__name-playlists"}
                        onClick={() => setIsPlaylists(true)}
                    >
                        Danh sách phát
                    </div>
                    <div
                        className={isPlaylists ? "playlists__name-current" : "playlists__name-current playlists__name--active"}
                        onClick={() => setIsPlaylists(false)}
                    >
                        Nghe gần đây
                    </div>
                </div>
                <AccessAlarmsIcon className="playlists__icon" />
                <div className="playlists__header-loadmore">
                    <span onClick={handleClosePlaylists}>x</span>
                    <div className="playlists__loadmore-detail">Đóng</div>
                </div>
            </div>
            <div className="playlists__body">
                
                <ul className="playlists__lists">
                    {
                        playlistsType.map((music, index) => {
                            return (
                                <li
                                    className={activeClass(music.id)}
                                    key={index}
                                >
                                    <div className="playlists__item-detail" onClick={() => handleRunning(music)} >
                                        <div className="playlists__item-IMG">
                                            <img
                                                className="playlists__item-img"
                                                src={music.image}
                                                alt=""
                                            />
                                            {
                                                isBass(music.id)
                                            }

                                        </div>

                                        <div className="playlists__item-info">
                                            <div className="playlists__item-name">
                                                {music.name}
                                            </div>
                                            <div className="playlists__item-singer">
                                                {music.singer}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="playlists__item-action" onClick={() => setIsAdd(!isAdd)}>
                                        
                                        <span onClick={()=>removeMusic(music)}>X</span>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>

            </div>
            <div className="playlists__suggest">
                <div className="playlists__suggest-heading">
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default PlayLists;
