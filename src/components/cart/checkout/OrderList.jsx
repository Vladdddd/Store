import React from 'react';
import s from './checkout.module.scss';

const OrderList = ({ totalPrice, cartProducts }) => {
    return (
        <div className={s.orderList}>
            <h1 className={s.caption}>Your order</h1>
            <div className={s.products}>
                <div>
                    {cartProducts.map((item, index) => {
                        return <h1 key={index} className={s.name}>{item.name}</h1>
                    })}
                </div>

                <h1 className={s.subPrice}>Sub Total: ${totalPrice}</h1>
            </div>

            <div className={s.paymentMethod}>

            </div>
        </div>
    );
}

export default OrderList;