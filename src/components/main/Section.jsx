import React from 'react';
import { Route, Routes } from 'react-router';
import Products from './products/Products';

const Main = ({ products, onPageChanged, currentPage, totalProductsCount, pageSize, onAddInCart, storageChecker, addedItems, setCurrentSection, getProducts, getUserProducts, location, ProductsPreloader, NotFound }) => {

    return (
        <>           
            <Routes>
                <Route path="/" element={<Products
                    products={products}
                    getProducts={getProducts}
                    
                    currentSection={"All Products"}
                    setCurrentSection={setCurrentSection}

                    onPageChanged={onPageChanged}
                    currentPage={currentPage}
                    totalProductsCount={totalProductsCount}
                    pageSize={pageSize}
                    onAddInCart={onAddInCart}
                    storageChecker={storageChecker}
                    addedItems={addedItems} 

                    location={location}
                    ProductsPreloader={ProductsPreloader}
                    />} />

                <Route path="/location" element={<Products
                    products={products}
                    getProducts={getUserProducts}
                    
                    currentSection={"For You"}
                    setCurrentSection={setCurrentSection}

                    onPageChanged={onPageChanged}
                    currentPage={currentPage}
                    totalProductsCount={totalProductsCount}
                    pageSize={pageSize}
                    onAddInCart={onAddInCart}
                    storageChecker={storageChecker}
                    addedItems={addedItems} 

                    location={location}
                    ProductsPreloader={ProductsPreloader}
                    />} />
                
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default Main;