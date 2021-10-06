import { Grid } from '@mui/material';
import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import './slider.css'
var items1 = [
    <img className="slider__img slider__img-first" src="https://photo-zmp3.zadn.vn/banner/8/4/4/d/844dfe8590fa3c5f1a7aff7111c00ba9.jpg" alt="" />,
    <img className="slider__img slider__img-body" src="https://photo-zmp3.zadn.vn/banner/e/4/a/f/e4afac91a65c4651043d5de5a82612ba.jpg" alt="" />,
    <img className="slider__img slider__img-last" src="	https://photo-zmp3.zadn.vn/banner/1/d/7/d/1d7dd52ab8fa93bdcd97b87b8e14b846.jpg" alt="" />
]
const Slider = () => {
    const [items] = useState(items1)
    

    return (
        <div className="slider">
           
            <Grid container spacing={2}>
                {
                    items.map((item, index) => {
                        return (
                            <Grid item xs={6} sm={6} md={4} key={index}>
                                <Link to="/">
                                    {item}
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default Slider;
