import React from 'react';
import s from './notFound.module.scss';
import warning from '../assets/warning.svg';

const NotFound = () => {
    return (
        <div className={s.notFound}>

            <img className={s.warningImg} src={warning} alt="" />

            <div className={s.captions}>
                <h1 className={s.caption}>404 error</h1>
                <h1 className={s.caption}>Page not found</h1>
            </div>

        </div>
    );
}

export default NotFound;