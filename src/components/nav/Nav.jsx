import React, { useState } from 'react';
import s from './nav.module.scss';
import cart from '../assets/cart.svg';
import market from '../assets/market.svg';
import { NavLink } from "react-router-dom";
import Location from './location/Location';
import SearchForm from './search/SearchForm';

const Nav = ({totalPrice, locations, location, onLocationChange, searchedProductName, setProductName, getSearchedProducts, onSectionChanged }) => {
    const [chooseLocation, setChooseLocation] = useState(false);

    return (
        <div className={s.nav}>
            <NavLink to="/" onClick={()=>{onSectionChanged('All Products')}}><div className={s.logo}>
                <img className={s.logoIcon} src={market} alt="" />
                <span className={s.border}></span>
                <h2 className={s.name}>Online Food</h2>
            </div></NavLink>

            <div className={s.locationPanel}>
                <div className={s.location}>
                    <h1 className={s.text}>Your location</h1>
                    <h2 className={s.loc}>{location}</h2>
                </div>
                <button className={s.chooseButton} onClick={() => {setChooseLocation(true)}}>Choose</button>
            </div>
            
            {chooseLocation &&
                <Location setChooseLocation={setChooseLocation} locations={locations} onLocationChange={onLocationChange}/>                
            }

            <SearchForm searchedProductName={searchedProductName} 
                setProductName={setProductName} 
                getSearchedProducts={getSearchedProducts} 
                onSectionChanged={onSectionChanged}/>

            <div className={s.account}>
                <img className={s.userIcon} src="https://cdn4.iconfinder.com/data/icons/top-search-7/128/_user_account_profile_head_person_avatar-256.png" alt="" />
                <h2 className={s.price}>${totalPrice}</h2>
                <NavLink to="/cart" className={s.active}><img className={s.cartIcon} src={cart} alt="" /></NavLink>
            </div>
        </div>
    );
}

export default Nav;