import React, { useState, useEffect, useRef } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Slider from '@mui/material/Slider';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import './song.css'
import { listenedPlaylists, setOpenPlaylists} from '../../actions/playlists';
import { useDispatch, useSelector } from 'react-redux';
import { isRunning } from '../../actions/music';

const Song = ({ tracks }) => {
    const dispatch = useDispatch()
    const isRunningMusic = useSelector(state => state.music.isRunning)
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(isRunningMusic);
    const [isHoverProgress, setIsHoverProgress] = useState(false)
    const [onLoop, setOnLoop] = useState(false)
    const [onShuffle, setOnShuffle] = useState(false)
    const [volume, setVolume] = useState(100)
    const { name, song, image, singer} = tracks[trackIndex];
    const handleOpenPlaylists = () => {
        const action = setOpenPlaylists(true)
        dispatch(action)
    }

    const audioRef = useRef(new Audio(song));
    const intervalRef = useRef();
    const isReady = useRef(false);
    audioRef.current.volume = volume / 100

    const handleChange = async (e, newValue) => {
        await setVolume(newValue);
        audioRef.current.volume = volume / 100
    };

    const { duration } = audioRef.current;

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                if (onLoop) {
                    audioRef.current.play()
                }
                else {
                    toNextTrack();
                }


            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    };

    const toNextTrack = () => {
        if (onShuffle) {
            setTrackIndex(Math.floor(Math.random() * tracks.length));
        }
        else {
            if (trackIndex < tracks.length - 1) {
                setTrackIndex(trackIndex + 1);
            } else {
                setIsPlaying(false)

            }
        }

    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            const action = listenedPlaylists(tracks[trackIndex])
            dispatch(action)
            const actionIsRunning = isRunning(isPlaying)
            dispatch(actionIsRunning)
            startTimer();

        } 
        else {
            audioRef.current.pause();
            const actionIsRunning = isRunning(isPlaying)
            dispatch(actionIsRunning)
        }
    }, [isPlaying, audioRef, song,isRunningMusic]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(song);

        setTrackProgress(audioRef.current.currentTime);


        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [trackIndex, audioRef, song]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <>
            {
                tracks.length !== 0 ?
                    <div className="song">
                        <div className="song__info">
                            <div className="song__info-singer">
                                <div className="song__info-img">
                                    <img
                                        src={image}
                                        alt=""
                                        className={isPlaying ? 'img__rotation' : ''} />
                                </div>
                                <div className="song__info-detail">
                                    <div className="song__info-name">
                                        {name}
                                    </div>
                                    <div className="song__info-singer-name">
                                        {singer}
                                    </div>
                                </div>
                            </div>
                            <div className="song__info-heart">
                                <FavoriteBorderIcon className="song__info-icon" />
                                <span className="song__info-heart-detail">
                                    Thêm vào danh sách phát
                                </span>
                            </div>
                            <div className="song__info-loadmore">
                                ...
                                <span className="song__info-loadmore-detail">
                                    Xem thêm
                                </span>
                            </div>
                        </div>
                        <div className="song__controls">
                            <div className="song__controls-icons">
                                <ShuffleIcon className={onShuffle ? 'song__controls-icon song__controls-icon--active song__controls-icon-border' : 'song__controls-icon song__controls-icon-border'} onClick={() => setOnShuffle(!onShuffle)} />
                                <FastRewindIcon onClick={toPrevTrack} className="song__controls-icon song__controls-icon-border" />
                                {
                                    isPlaying ?
                                        <PauseCircleOutlineOutlinedIcon
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="song__controls-icon song__controls-icon--play"
                                        />
                                        :
                                        <PlayCircleOutlineOutlinedIcon
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="song__controls-icon song__controls-icon--pause"
                                        />
                                }
                                <FastForwardIcon className="song__controls-icon song__controls-icon-border" onClick={toNextTrack} />
                                <LoopIcon className={onLoop ? 'song__controls-icon song__controls-icon--active song__controls-icon-border' : 'song__controls-icon song__controls-icon-border'} onClick={() => setOnLoop(!onLoop)} />
                            </div>
                            <div className="song__controls-times">
                                <div className="song__controls-progress">0{Math.floor(trackProgress / 60)} : {Math.floor(trackProgress - Math.floor(trackProgress / 60) * 60)}</div>
                                {
                                    isHoverProgress === true ?
                                        <input
                                            type="range"
                                            value={trackProgress}
                                            step="1"
                                            min="0"
                                            max={duration ? duration : `${duration}`}
                                            className="progress"
                                            onChange={(e) => onScrub(e.target.value)}
                                            onMouseUp={onScrubEnd}
                                            onKeyUp={onScrubEnd}
                                            style={{ width: "300px" }}
                                            onMouseLeave={() => setIsHoverProgress(false)}
                                        />
                                        :


                                        <Box sx={{ width: '300px', height: '10px' }} className="box__progress">
                                            <LinearProgress
                                                onMouseEnter={() => setIsHoverProgress(true)}
                                                variant="determinate"
                                                value={trackProgress / duration * 100}
                                                valueBuffer={100}
                                                className="progress__default"
                                            />
                                        </Box>
                                }
                                {
                                    duration ?
                                        <div className="song__controls-end">
                                            0{Math.floor(duration / 60)} : {Math.floor(duration - Math.floor(duration / 60) * 60)}
                                        </div>
                                        :
                                        <div className="song__controls-end">
                                            00:00
                                        </div>
                                }

                            </div>
                        </div>
                        <div className="song__action">
                            <div className="song__action-left">
                                <VideoLibraryIcon className="song__action-icon song__action-MV" />
                                <MicExternalOnIcon className="song__action-icon song__action-kara" />
                                {
                                    volume === 0 ?
                                        <VolumeOffIcon className="song__action-icon" />
                                        :
                                        <VolumeUpIcon className="song__action-icon" onClick={() => setVolume(0)} />

                                }

                                <Slider aria-label="Volume" value={volume} onChange={handleChange} className="volume__slider" />


                            </div>
                            <div className="song__action-separate" >|</div>
                            <div className="song__action_right">
                                <QueueMusicIcon className="song__action-icon" onClick={handleOpenPlaylists} />
                            </div>
                        </div>
                    </div>
                    :
                    ''

            }
        </>

    );
}

export default Song;
