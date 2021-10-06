import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Pagesearch from '../PageSearch/PageSearch';
import Slider from '../Slider/Slider';
import ListMusic from '../utils/ListMusic/ListMusic';
import './mainpage.css';

const MainPage = () => {
    
    return (
        <div className="main__page" >
            <Slider />
            <ListMusic />
        </div>
    );
}

export default MainPage;
