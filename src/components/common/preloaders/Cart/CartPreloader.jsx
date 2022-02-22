import React from "react";
import s from './cartPreloader.module.scss';

const CartPreloader = () => {
    return (
        <div className={s.checkout}>

            <div className={s.cart}>
            <h1 className={s.cartCaption}></h1>
                <div className={s.cartProducts}>
                    <div className={s.itemOfCart}></div>
                </div>
                <button className={s.submitPay} disabled></button>
            </div>

            <div className={s.totals}></div>
        </div>
    );
}

export default CartPreloader;