import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../../utilities/fakedb';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import './Shop.css'
const Shop = () => {
    const products = useLoaderData()
    const [cart, setCart] = useState([])

    const clearCart = () => {
        setCart([])
        deleteShoppingCart()
    }


    useEffect(() => {
        const storedCart = getStoredCart()
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart)
    }, [products])


    const handlerAddToCart = (selectedproduct) => {
        console.log(selectedproduct)
        let newCart = []
        const exists = cart.find(product => product.id === selectedproduct.id)
        if (!exists) {
            selectedproduct.quantity = 1;
            newCart = [...cart, selectedproduct]
        }
        else {
            const rest = cart.filter(product => product.id !== selectedproduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }
        setCart(newCart)
        addToDb(selectedproduct.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handlerAddToCart={handlerAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    clearCart={clearCart}
                >
                    <Link to='/orders'>
                        <button>Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;