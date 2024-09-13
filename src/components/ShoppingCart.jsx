import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateQuantity, checkout, selectCartItems} from '../features/auth/cart/cartSlice'; // Redux slice for handling cart actions

const ShoppingCart = () => {
    const dispatch = useDispatch();
    
    // Directly select cartItems from Redux state without memoization
    const cart = useSelector(state => state.cart?.cartItems || []); 
    const cartError = useSelector(state => state.cart.error); 
    const [totalAmount, setTotalAmount] = useState(0);

    // Always fetch cart items when the component mounts
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    console.log("Cart received in frontend:", cart);

    // Recalculate totalAmount when cart changes
    useEffect(() => {
        if (cart.length > 0) {
          const total = cart.reduce((sum, item) => {
            if (item.productId) {
              return sum + item.productId.price * item.quantity;
            }
            return sum;
          }, 0);
          setTotalAmount(total);
        }
    }, [cart]);

    const handleQuantityChange = (productId, quantity) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleCheckout = () => {
        dispatch(checkout());
    };

    if (cartError) {
        return <p>Error loading cart: {cartError}</p>;
    }

    return (
        <div className="shopping-cart-container flex">
            <div className="cart-items w-2/3 p-4">
                <h2>Your Cart</h2>
                <ul>
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.map(item => (
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
                                        <option key={qty} value={qty}>{qty}</option>
                                    ))}
                                </select>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="order-summary w-1/3 p-4">
                <h2>Order Summary</h2>
                {cart.length === 0 ? (
                    <p>No items to summarize</p>
                ) : (
                    <>
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
                        <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">
                            Checkout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// const ShoppingCart = () => {
//     const dispatch = useDispatch();

//     const cart = useSelector(selectCartItems); // Use the memoized selector
//     const cartError = useSelector(state => state.cart?.error); // Check if there is an error
//     const [totalAmount, setTotalAmount] = useState(0);

//     // Fetch cart items when the component mounts if the cart is empty
//     useEffect(() => {
//         if (cart.length === 0) {
//             dispatch(getCart());
//         }
//     }, [dispatch, cart.length]);

//     console.log("Cart received in frontend:", cart);

//     // Recalculate the total amount only when the cart changes
//     useEffect(() => {
//         if (cart.length > 0) {
//             const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
//             setTotalAmount(total);
//         }
//     }, [cart]);

//     const handleQuantityChange = (productId, quantity) => {
//         dispatch(updateQuantity({ productId, quantity }));
//     };

//     const handleCheckout = () => {
//         dispatch(checkout());
//     };

//     // Check for errors and display if needed
//     if (cartError) {
//         return <p>Error loading cart: {cartError}</p>;
//     }

//     return (
//         <div className="shopping-cart-container flex">
//             {/* Left column - Cart items */}
//             <div className="cart-items w-2/3 p-4">
//                 <h2>Your Cart</h2>
//                 <ul>
//                     {cart.length === 0 ? (
//                         <p>Your cart is empty</p>
//                     ) : (
//                         cart.map(item => (
//                             <li key={item.productId._id} className="flex justify-between items-center">
//                                 <img src={item.productId.imageUrl} alt={item.productId.title} className="w-16 h-16" />
//                                 <div>
//                                     <p>{item.productId.title}</p>
//                                     <p>${item.productId.price.toFixed(2)}</p>
//                                 </div>
//                                 <select
//                                     value={item.quantity}
//                                     onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
//                                 >
//                                     {[1, 2, 3, 4, 5].map(qty => (
//                                         <option key={qty} value={qty}>
//                                             {qty}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </li>
//                         ))
//                     )}
//                 </ul>
//             </div>

//             {/* Right column - Order summary */}
//             <div className="order-summary w-1/3 p-4">
//                 <h2>Order Summary</h2>
//                 {cart.length === 0 ? (
//                     <p>No items to summarize</p>
//                 ) : (
//                     <>
//                         <ul>
//                             {cart.map(item => (
//                                 <li key={item.productId._id} className="flex justify-between">
//                                     <span>{item.productId.title}</span>
//                                     <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                         <div className="flex justify-between">
//                             <span>Total</span>
//                             <span>${totalAmount.toFixed(2)}</span>
//                         </div>
//                         <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">
//                             Checkout
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };


// const ShoppingCart = () => {
//     const dispatch = useDispatch();
//     const cart = useSelector(state => state.cart?.cartItems || []);  // If cart is undefined, default to an empty array
//     const [totalAmount, setTotalAmount] = useState(0);

//     useEffect(() => {
//         // Fetch the cart items from backend when component mounts
//         dispatch(getCart());
//     }, [dispatch]);
//     console.log(cart); 

//     useEffect(() => {
//         // Calculate total amount whenever cart changes
//         const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
//         setTotalAmount(total);
//     }, [cart]);

//     const handleQuantityChange = (productId, quantity) => {
//         dispatch(updateQuantity({ productId, quantity }));
//     };

//     const handleCheckout = () => {
//         dispatch(checkout());
//     };


// const ShoppingCart = () => {
//     const dispatch = useDispatch();



//      const cart = useSelector(state => state.cart?.cartItems || []);  // If cart is undefined, default to an empty array
//     const [totalAmount, setTotalAmount] = useState(0);

//     useEffect(() => {
//         // Fetch the cart items from backend when component mounts
//         dispatch(getCart());
//     }, [dispatch]);

//     useEffect(() => {
//         // Calculate total amount whenever cart changes
//         const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
//         setTotalAmount(total);
//     }, [cart]);

//     const handleQuantityChange = (productId, quantity) => {
//         dispatch(updateQuantity({ productId, quantity }));
//     };

//     const handleCheckout = () => {
//         dispatch(checkout());
//     };

//     return (
//         <div className="shopping-cart-container flex">
//             {/* Left column - Cart items */}
//             <div className="cart-items w-2/3 p-4">
//                 <h2>Your Cart</h2>
//                 <ul>
//                     {cart.map(item => (
//                         <li key={item.productId._id} className="flex justify-between items-center">
//                             <img src={item.productId.imageUrl} alt={item.productId.title} className="w-16 h-16" />
//                             <div>
//                                 <p>{item.productId.title}</p>
//                                 <p>${item.productId.price.toFixed(2)}</p>
//                             </div>
//                             <select
//                                 value={item.quantity}
//                                 onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
//                             >
//                                 {[1, 2, 3, 4, 5].map(qty => (
//                                     <option key={qty} value={qty}>
//                                         {qty}
//                                     </option>
//                                 ))}
//                             </select>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Right column - Order summary */}
//             <div className="order-summary w-1/3 p-4">
//                 <h2>Order Summary</h2>
//                 <ul>
//                     {cart.map(item => (
//                         <li key={item.productId._id} className="flex justify-between">
//                             <span>{item.productId.title}</span>
//                             <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="flex justify-between">
//                     <span>Total</span>
//                     <span>${totalAmount.toFixed(2)}</span>
//                 </div>
//                 <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">Checkout</button>
//             </div>
//         </div>
//     );
// };

export default ShoppingCart;