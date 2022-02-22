import React, { useEffect } from 'react';
import Paginator from '../../common/paginator/Paginator';
import ItemOfProducts from './ItemOfProducts';
import s from './products.module.scss';

const Products = ({ products, onPageChanged, currentPage, totalProductsCount, pageSize, onAddInCart, storageChecker, addedItems, getProducts, currentSection, setCurrentSection, location, ProductsPreloader }) => {
    useEffect(() => {
        getProducts();
        setCurrentSection(currentSection);
    }, [currentSection]);

    //Постоянно срабатывает эффект, даже когда повторный вызов getProducts не нужен
    useEffect(() => {
        getProducts();
    }, [location])

    if(products.length === 0) {
        return <ProductsPreloader />
    }

    return (
        <>
            <div className={s.captionBlock}>
                {currentSection && <h1 className={s.caption}>{currentSection}</h1>}
                <p className={s.description}>Some information about this block</p>
            </div>
            <div className={s.products}>
                {
                    products.map((item, index) => {
                        return <ItemOfProducts productItem={item} key={index}
                            index={index} onAddInCart={onAddInCart}
                            storageChecker={storageChecker} addedItems={addedItems}
                            currentPage={currentPage} />
                    })
                }
            </div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalProductsCount} pageSize={pageSize} productsLength={products.length}/>
        </>
    );
}

export default Products;