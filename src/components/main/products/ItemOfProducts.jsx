import React from 'react';
import s from './products.module.scss';

const ItemOfProducts = ({productItem, index, onAddInCart, currentPage, storageChecker}) => {
    const firstBorder = index === 0 ? s.firstBorder : s.leftBorder;
    const secondBorder = index === 3 ? s.secondBorder : '';
    
    return (
        <div className={s.productItem + ' ' + firstBorder + ' ' + secondBorder}>
            <div>
                <img src={productItem.url} alt="" className={s.productImg}/>
            </div>
            
            <div className={s.description}>
                <h1 className={s.name}>{productItem.name}</h1>
                <h2 className={s.stock}>{productItem.amount !== 0 && "IN STOCK"}</h2>
                <h1 className={s.price}>${productItem.price}</h1>
            </div>
            
            {!storageChecker(productItem.id) && 
                <button className={s.addButton} onClick={() => {onAddInCart(productItem.id, true, productItem.price, currentPage)}}>Add to card</button>}
            
            {storageChecker(productItem.id) && 
                <button className={s.removeButton} onClick={() => {onAddInCart(productItem.id, false, productItem.price, currentPage)}}>Remove from cart</button>}
        </div>
    );
}

export default ItemOfProducts;