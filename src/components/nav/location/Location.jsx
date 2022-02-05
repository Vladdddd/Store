import React from "react";
import s from './location.module.scss'

const Location = ({ setChooseLocation, locations, onLocationChange }) => {

    return (
        <div className={s.location}>
            <div className={s.locationBackground}></div>


            <div className={s.detailedLocation}>

                <div className={s.blockCaptions}>
                    <div>
                        <h1 className={s.blockCaption}>Choose your delivery location</h1>
                        <h2 className={s.notification}>Enter your address and we will specify products for your city</h2>
                    </div>
                    <button className={s.closeButton} onClick={() => { setChooseLocation(false) }}>x</button>
                </div>

                <div className={s.cities}>
                    {
                        locations.map((item, index) => {
                            return <h1 className={s.caption} key={index} onClick={() => { onLocationChange(item); setChooseLocation(false) }}>{item}</h1>
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default Location;