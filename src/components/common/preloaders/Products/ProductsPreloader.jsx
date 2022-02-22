import React from 'react';
import s from './productsPreloader.module.scss';

const ProductsPreloader = () => {
    return (
        <>
            <div className={s.captionBlock}></div>
            <div className={s.products}>
                <div className={s.productItem}></div>
                <div className={s.productItem}></div>
                <div className={s.productItem}></div>
                <div className={s.productItem}></div>
            </div>
        </>
    );
}

export default ProductsPreloader;