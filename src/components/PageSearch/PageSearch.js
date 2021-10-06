import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './pageSearch.css'
import { useSelector } from 'react-redux';
import { setRunning } from '../../actions/music';
import { useDispatch } from 'react-redux';
import { addYourPlaylists } from '../../actions/playlists';
const Pagesearch = () => {
    const searchMusics = useSelector(state => state.music.searchMusics)
    const dispatch = useDispatch()
    const topMatching = searchMusics[0]
    const handleSetRunning = (music)=>{
        const action = setRunning(music)
        dispatch(action)
    }
    const handleAddPlaylists = (music)=>{
        const action = addYourPlaylists(music)
        dispatch(action)
    }
    return (
        <div className="pageSearch">
            {
                topMatching ?
                    <div className="pageSearch__first-match">
                        <div className="pageSearch__first-heading">
                            Top Kết quả <span>" {topMatching.name}"</span>
                        </div>
                        <div className="pageSearch__first-body">
                            <div className="pageSearch__first-Img">
                                <img alt="" src={topMatching.image} className="pageSearch__first-img-song" />
                                <span className="pageSearch__first-action" onClick={()=>handleSetRunning(topMatching)}>
                                    <PlayCircleOutlineIcon className="pageSearch__first-icon" />
                                </span>
                            </div>
                            <div className="pageSearch__first-detail">
                                <div className="pageSearch__first-name">{topMatching.name}</div>
                                <div className="pageSearch__first-singer">{topMatching.singer}</div>
                            </div>


                        </div>
                    </div> : ''
            }
            <div className="pageSearch__table-list">
                <div className="pageSearch__table-heading">
                    Bài hát
                </div>
                {
                    searchMusics.map((music, index) => {
                        return (
                            <div className="pageSearch__detail" key={index}>
                                <div className="pageSearch__info">
                                    <img className="pageSearch__img" alt="" src={music.image} />
                                    <div className="pageSearch__detail-song">
                                        <div className="pageSearch__detail-name">{music.name}</div>
                                        <div className="pageSearch__detail-singer">{music.singer}</div>
                                    </div>
                                </div>
                                <div className="pageSearch__action">
                                    <PlayCircleOutlineIcon className="pageSearch__action-icon" onClick={()=>handleSetRunning(music)}/>
                                    <FavoriteBorderIcon className="pageSearch__action-icon" onClick={()=>handleAddPlaylists(music)}/>
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

export default Pagesearch;
