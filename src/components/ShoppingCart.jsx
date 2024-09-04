import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateQuantity, checkout } from '../features/cart/cartSlice'; // Redux slice for handling cart actions

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cartItems);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Fetch the cart items from backend when component mounts
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        // Calculate total amount whenever cart changes
        const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
        setTotalAmount(total);
    }, [cart]);

    const handleQuantityChange = (productId, quantity) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleCheckout = () => {
        dispatch(checkout());
    };

    return (
        <div className="shopping-cart-container flex">
            {/* Left column - Cart items */}
            <div className="cart-items w-2/3 p-4">
                <h2>Your Cart</h2>
                <ul>
                    {cart.map(item => (
                        <li key={item.productId._id} className="flex justify-between items-center">
                            <img src={item.productId.imageUrl} alt={item.productId.title} className="w-16 h-16" />
                            <div>
                                <p>{item.productId.title}</p>
                                <p>${item.productId.price.toFixed(2)}</p>
                            </div>
                            <select
                                value={item.quantity}
                                onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                            >
                                {[1, 2, 3, 4, 5].map(qty => (
                                    <option key={qty} value={qty}>
                                        {qty}
                                    </option>
                                ))}
                            </select>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right column - Order summary */}
            <div className="order-summary w-1/3 p-4">
                <h2>Order Summary</h2>
                <ul>
                    {cart.map(item => (
                        <li key={item.productId._id} className="flex justify-between">
                            <span>{item.productId.title}</span>
                            <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">Checkout</button>
            </div>
        </div>
    );
};

export default ShoppingCart;