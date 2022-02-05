import React from "react";
import ItemOfCart from "./ItemOfCart";
import s from './cart.module.scss';
import { NavLink } from "react-router-dom";

const Cart = ({ cartProducts, totalPrice }) => {
    if(totalPrice === 0) {
        return <div>Your cart is empty</div>
    }
    return (
        <div className={s.checkout}>
            <div className={s.cart}>
                <h1 className={s.cartCaption}>Your products</h1>
                {cartProducts && cartProducts.map((item, index) => {
                    return <ItemOfCart itemOfCart={item} key={index} index={index} length={cartProducts.length}/>
                })}
                <NavLink to="/cart/checkout"><button className={s.submitPay}>Proceed to checkout</button></NavLink>
            </div>

            <div className={s.totals}>
                <h1 className={s.totalPrice}>Total Price: ${totalPrice}</h1>
                <h2 className={s.totalItems}><b>x{cartProducts.length}</b> items in your cart</h2>
            </div>
        </div>
    );
}

export default Cart;