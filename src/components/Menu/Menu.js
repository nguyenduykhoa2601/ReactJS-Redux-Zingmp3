import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicTwoToneIcon from '@mui/icons-material/LibraryMusicTwoTone';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './menu.css';

const Menu = () => {
    const params = useLocation()
    return (
        <div>
            <div className="menu">
                <div className="menu__top">
                    <img className="logo__menu" alt=""  />
                    <ul className="list__menu">
                        <Link to="/" className="item__menu-link" >
                            <li className="item__menu">
                                <MusicVideoIcon className="item__menu-icon" />
                                <span className="item__menu-name">Cá nhân</span>
                            </li>
                        </Link>
                        <Link to="/" className="item__menu-link">
                            <li className="item__menu">
                                <AlbumIcon className="item__menu-icon" />
                                <span className="item__menu-name">Khám phá</span>
                            </li>
                        </Link>
                        <Link to="/" className="item__menu-link">
                            <li className="item__menu">
                                <TimelineRoundedIcon className="item__menu-icon" />
                                <span className="item__menu-name">Zing Chart</span>
                            </li>
                        </Link>
                        <Link to="/" className="item__menu-link">
                            <li className="item__menu">
                                <LibraryMusicTwoToneIcon className="item__menu-icon" />
                                <span className="item__menu-name">Radio</span>
                            </li>
                        </Link>
                        <Link to="/" className="item__menu-link">
                            <li className="item__menu">
                                <ListOutlinedIcon className="item__menu-icon" />
                                <span className="item__menu-name">Theo dõi</span>
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="line"></div>
                <div className="menu__bottom">
                    <ul className="list__menu">
                        <Link to="/" className="item__menu-link">
                            <li className="item__menu">
                                <MusicNoteRoundedIcon className="item__menu-icon" />
                                <span className="item__menu-name">Nhạc mới</span>
                            </li>
                        </Link>
                        <Link to="/" className="item__menu-link">
                            <li className="item__menu">
                                <WorkspacesIcon className="item__menu-icon" />
                                <span className="item__menu-name">Thể loại</span>
                            </li>
                        </Link>
                        <Link to="/top" className="item__menu-link" >
                            <li className={params.pathname === "/top"?"item__menu item__menu--active" : "item__menu"}>
                                <StarBorderIcon className="item__menu-icon" />
                                <span className="item__menu-name">Top 100</span>
                            </li>
                        </Link>
                        <Link to="/" className="item__menu-link">
                            <li className="item__menu">
                                <VideoLibraryIcon className="item__menu-icon" />
                                <span className="item__menu-name">MV</span>
                            </li>
                        </Link>
                        

                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Menu;
