import cn from "classnames";
import React from "react";
import s from './cart.module.scss';

const ItemOfCart = ({ itemOfCart, index, length }) => {

    return (
        <div className={cn(s.itemOfCart, s.border)}>
            <h1 className={s.caption}>{itemOfCart.name}</h1>
            <h1 className={s.caption}>${itemOfCart.price}</h1>
        </div>
    );
}

export default ItemOfCart;