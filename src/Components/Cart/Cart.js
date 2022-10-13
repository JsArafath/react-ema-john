import React from 'react';
import Product from '../Product/Product';
import './Cart.css'
const Cart = (props) => {
    const { cart, clearCart, children } = props;
    // console.log(cart)

    let total = 0;
    let quantity = 0;
    let shipping = 0;
    for (const pro of cart) {
        quantity = quantity + pro.quantity
        total = total + pro.price * pro.quantity;
        shipping = shipping + pro.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2))
    const GrandTotal = (total + shipping + tax);
    return (
        <div className='cart'>
            <h4 >Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price:$ {total} </p>
            <p>Total Shipping:$ {shipping}</p>
            <p>Tax: {tax}</p>
            <h5>Grand Total: {GrandTotal.toFixed(2)}</h5>
            <button onClick={clearCart}>Clear Cart</button>
            {children}
        </div>
    );
};

export default Cart;