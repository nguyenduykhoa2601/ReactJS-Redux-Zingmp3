import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { setRunning } from "../../../actions/music";
import { addYourPlaylists, setOpenPlaylists } from "../../../actions/playlists";
import listsAPI from "../../../api/listsAPI";
import Bassmusic from "../BassMusic/BassMusic";
import './listMusic.css';




const Listmusic = () => {
    const runningMusic = useSelector(state => state.music.runningMusic)
    const isRunningSong = useSelector(state => state.music.isRunning)
    const [lists, setLists] = useState([])
    const [isHover, setIsHover] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        const getListMusic = async () => {
            const res = await listsAPI.getList()
            await setLists(res)
        }
        getListMusic()
    }, [])

    const handleAddPlaylists = (song) => {
        const action = addYourPlaylists(song)
        const actionOpenPlaylists = setOpenPlaylists(true)
        dispatch(action)
        dispatch(actionOpenPlaylists)
    }
    const handleAddRunningMusic = (song) => {
        const action = setRunning(song)
        dispatch(action)
    }
   
    const isBass = (id) => {
        if (runningMusic.length > 0) {
            const current = runningMusic[0]
            if (current.id === id && isRunningSong) {
                return <Bassmusic />
            }
        }
        return ''
    }
    return (
        <>
            {
                lists.length !== 0 ?
                    <div className="lists__music" >
                        {
                            lists.map((list, index) => {
                                return (
                                    <div className="list__item-music" key={index}>
                                        <div className="list__heading-music">
                                            {list.name}
                                        </div>
                                        <Swiper
                                            spaceBetween={16}

                                            className="listMusic__slider"
                                            breakpoints={{
                                                "640": {
                                                    "slidesPerView": 1,
                                                    "spaceBetween": 16
                                                },
                                                "768": {
                                                    "slidesPerView": 3,
                                                    "spaceBetween": 24
                                                },
                                                "1024": {
                                                    "slidesPerView": 5,
                                                    "spaceBetween": 16
                                                }
                                            }}
                                        >
                                            {
                                                list.content.map((song, index) => {
                                                    return (
                                                        <SwiperSlide key={index}>
                                                            <div className="music__item" onMouseLeave={() => setIsHover()} onMouseEnter={() => setIsHover(song.id)} >
                                                                <div className="music__item-img-modal">
                                                                    <img className="music__item-img" src={song.image} alt="" />
                                                                </div>
                                                                {
                                                                    isHover === song.id ?
                                                                        <div className="music__item-action">
                                                                            <FavoriteBorderIcon className="music__item-action-icon" onClick={() => handleAddPlaylists(song)} />
                                                                            {
                                                                                isRunningSong ?
                                                                                    <PauseCircleOutlineOutlinedIcon className="music__item-action-icon"/>
                                                                                    :
                                                                                    <PlayCircleOutlineIcon className="music__item-action-icon" onClick={() => handleAddRunningMusic(song)} />
                                                                            }

                                                                            <span>...</span>

                                                                        </div>
                                                                        : isBass(song.id)
                                                                }


                                                            </div>
                                                            <div className="music__item-name">{song.name}</div>
                                                        </SwiperSlide>
                                                    )
                                                })
                                            }
                                        </Swiper>
                                    </div>
                                )
                            })
                        }

                    </div>
                    : ''

            }
        </>

    );
}

export default Listmusic;
