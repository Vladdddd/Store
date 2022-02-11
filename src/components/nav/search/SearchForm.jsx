import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from '../nav.module.scss';

const SearchForm = ({onSectionChanged, getSearchedProducts, ...props}) => {

    let [searchedProductName, setProductName] = useState(props.searchedProductName);
    
    useEffect( () => {
        setProductName(props.searchedProductName);
    }, [props.searchedProductName]);

    const onNameChange = (e) => {
        setProductName(e.currentTarget.value);
    }

    const onSubmit = () => {
        props.setProductName(searchedProductName);
        getSearchedProducts(searchedProductName);
    }

    return (
        <div className={s.searchForm}>
            <input onChange={onNameChange} type="search" placeholder="Search for products..." value={searchedProductName}/>
            <NavLink to="/searched"><button onClick={() => {onSubmit()}}><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-256.png" alt=""/></button></NavLink>
        </div>
    )
}

export default SearchForm;