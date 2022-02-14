import cn from "classnames";
import React from "react";
import s from './cart.module.scss';

const ItemOfCart = ({ itemOfCart, index, length }) => {

    return (
        <div className={s.itemOfCart}>
            <img className={s.itemImg} src={itemOfCart.url} alt="" />
            <h1 className={s.caption}>{itemOfCart.name}</h1>
            <h1 className={s.caption}>${itemOfCart.price}</h1>
            <button className={s.deleteItem}><img src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/cross-256.png" alt="" /></button>
        </div>
    );
}

export default ItemOfCart;