import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useSelector } from 'react-redux';
import { setRunning } from '../../actions/music';
import { useDispatch } from 'react-redux';
import { addYourPlaylists } from '../../actions/playlists';
import './topMusics.css'
const Topmusics = () => {
    const musics = useSelector(state => state.music.musics)
    const sortedMusics = musics.sort((music_a, music_b) => {
        return music_b.viewed - music_a.viewed
    })
    const dispatch = useDispatch()
    const handleSetRunning = (music) => {
        const action = setRunning(music)
        dispatch(action)
    }
    const handleAddPlaylists = (music) => {
        const action = addYourPlaylists(music)
        dispatch(action)
    }

    const styleIndexTop = (index) => {
        if (index === 0) return " topMusic__index-1"
        else if (index === 1) return "topMusic__index-2"
        else if (index === 2) return "topMusic__index-3"
        else return "topMusic__index"
    }
    return (
        <div className="topMusic">
            <div className="topMusic__table-list">
                <div className="topMusic__table-heading">
                    Bảng xếp hạng
                </div>
                {
                    sortedMusics.map((music, index) => {
                        return (
                            <div className="topMusic__detail" key={index}>
                                <div className="topMusic__info">
                                    <div className={`topMusic__index ${styleIndexTop(index)}`}>{index + 1}</div>
                                    <img className="topMusic__img" alt="" src={music.image} />
                                    <div className="topMusic__detail-song">
                                        <div className="topMusic__detail-name">{music.name}</div>
                                        <div className="topMusic__detail-singer">{music.singer}</div>
                                    </div>
                                </div>

                                <div className="topMusic__action">
                                    <div className="topMusic__viewed">
                                        {
                                            Intl.NumberFormat().format(music.viewed)
                                        } viewed
                                    </div>
                                    <PlayCircleOutlineIcon className="topMusic__action-icon" onClick={() => handleSetRunning(music)} />
                                    <FavoriteBorderIcon className="topMusic__action-icon" onClick={() => handleAddPlaylists(music)} />
                                    <span>...</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Topmusics;
