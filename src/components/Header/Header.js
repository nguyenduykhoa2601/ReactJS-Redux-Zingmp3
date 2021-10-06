import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMusics } from '../../actions/music';
import './header.css';
const Header = () => {
    const [search, setSearch] = useState(' ')
    const dispatch = useDispatch()
    const handleChangeSearch = async (e) => {

        await setSearch(e.target.value)
        const action = await searchMusics(search)
        await dispatch(action)


    }

    return (
        <div className="header">
            <div className="header__left">
                <ArrowBackIcon className="header-left__icon" />
                <ArrowForwardIcon className="header-left__icon header-left__icon-right" />
                <div className="header__search">
                    <SearchIcon className="header__search-icon" />
                    <input className="header__search-input" name="search" type="text" placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV ..." onChange={(e) => handleChangeSearch(e)} />
                    <div className="header__search-result">

                    </div>
                </div>
            </div>
            <div className="header__right">
                <div className="header__right-title">
                    <img className="header__right-title-img" alt="" src="https://png.pngtree.com/png-vector/20191028/ourmid/pngtree-shirt-icon-for-your-design-websites-and-projects-png-image_1888204.jpg" />
                    <span className="header__right-detail-title">Chủ đề</span>
                </div>

                <div className="header__right-upload">
                    <FileUploadIcon className="header__right-icon" />
                    <span className="header__right-detail-upload">Tải lên</span>
                </div>
                <div className="header__right-setting" >
                    <SettingsIcon className="header__right-icon" />
                    <span className="header__right-detail-setting">Cài đặt</span>
                </div>
                <div className="header__right-profile">
                    <PersonRoundedIcon className="header__right-icon" />
                </div>
            </div>

        </div>
    );
}

export default Header;
