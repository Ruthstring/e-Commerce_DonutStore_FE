import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateQuantity, checkout, removeFromCart, selectCartItems, selectSessionExpired } from '../features/auth/cart/cartSlice'; // Redux slice for handling cart actions
import SessionExpiredModal from './SessionExpiredModal';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Directly select cartItems from Redux state without memoization
    const cart = useSelector(state => state.cart?.cartItems || []); 
    const cartError = useSelector(state => state.cart.error); 
    const sessionExpired = useSelector(selectSessionExpired); // Check if session expired
    const [totalAmount, setTotalAmount] = useState(0);
    const user = useSelector((state) => state.auth.user);

    // Always fetch cart items when the component mounts
    useEffect(() => {
        if (user) {
          dispatch(getCart());
        }
      }, [dispatch, user]);

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

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleCheckout = () => {
        dispatch(checkout());
    };

    const handleLogin = () => {
        navigate('/login', { state: { from: '/cart' } }); // Pass the current location (cart) to login route); // Redirect to the login page
    };

    // Show modal if session expired
    if (sessionExpired) {
        return <SessionExpiredModal onClose={handleLogin} />;
    }

    // Show error message if there's an error and session isn't expired
    if (cartError && !sessionExpired) {
        return <p>Error loading cart: {cartError}</p>;
    }

    return (

        <div className="shopping-cart-container flex">
      {/* Show a custom message if the user is not logged in */}
      {!user ? (
        <div className="not-logged-in-message flex flex-col items-center">
          <h2>Feeling like a donut?</h2>
          <p>Login to access your personal cart.</p>
          <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </div>
      ) : (
        <>
          {/* Show cart items if the user is logged in */}
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
                    <button 
                      onClick={() => handleRemoveItem(item.productId._id)} 
                      className="bg-red-500 text-white p-1 rounded ml-4"
                    >
                      Remove
                    </button>
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
        </>
      )}

      {/* Session Expired Modal */}
      {sessionExpired && <SessionExpiredModal onClose={() => navigate('/login')} />}
    </div>

        // <div className="shopping-cart-container flex">
        //     <div className="cart-items w-2/3 p-4">
        //         <h2>Your Cart</h2>
        //         <ul>
        //             {cart.length === 0 ? (
        //                 <p>Your cart is empty</p>
        //             ) : (
        //                 cart.map(item => (
        //                     <li key={item.productId._id} className="flex justify-between items-center">
        //                         <img src={item.productId.imageUrl} alt={item.productId.title} className="w-16 h-16" />
        //                         <div>
        //                             <p>{item.productId.title}</p>
        //                             <p>${item.productId.price.toFixed(2)}</p>
        //                         </div>
        //                         <select
        //                             value={item.quantity}
        //                             onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
        //                         >
        //                             {[1, 2, 3, 4, 5].map(qty => (
        //                                 <option key={qty} value={qty}>{qty}</option>
        //                             ))}
        //                         </select>
        //                         <button 
        //                             onClick={() => handleRemoveItem(item.productId._id)} 
        //                             className="bg-red-500 text-white p-1 rounded ml-4"
        //                         >
        //                             Remove
        //                         </button>
        //                     </li>
        //                 ))
        //             )}
        //         </ul>
        //     </div>

        //     <div className="order-summary w-1/3 p-4">
        //         <h2>Order Summary</h2>
        //         {cart.length === 0 ? (
        //             <p>No items to summarize</p>
        //         ) : (
        //             <>
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
        //                 <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">
        //                     Checkout
        //                 </button>
        //             </>
        //         )}
        //     </div>
        // </div>
    );
};




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCart, updateQuantity, checkout, selectCartItems, removeFromCart, selectSessionExpired} from '../features/auth/cart/cartSlice'; // Redux slice for handling cart actions
// import SessionExpiredModal from './SessionExpiredModal';
// import { useNavigate } from 'react-router-dom';

// const ShoppingCart = () => {
//     const dispatch = useDispatch();
    
//     // Directly select cartItems from Redux state without memoization
//     const cart = useSelector(state => state.cart?.cartItems || []); 
//     const navigate = useNavigate();
//     const cartError = useSelector(state => state.cart.error); 
//     const [totalAmount, setTotalAmount] = useState(0);
//     const sessionExpired = useSelector(state => state.cart.sessionExpired);

//     // Always fetch cart items when the component mounts
//     useEffect(() => {
//         dispatch(getCart());
//     }, [dispatch]);

//     console.log("Cart received in frontend:", cart);

//     // Recalculate totalAmount when cart changes
//     useEffect(() => {
//         if (cart.length > 0) {
//           const total = cart.reduce((sum, item) => {
//             if (item.productId) {
//               return sum + item.productId.price * item.quantity;
//             }
//             return sum;
//           }, 0);
//           setTotalAmount(total);
//         }
//     }, [cart]);

//     const handleQuantityChange = (productId, quantity) => {
//         dispatch(updateQuantity({ productId, quantity }));
//     };

//     const handleRemoveItem = (productId) => {
//         dispatch(removeFromCart(productId)); // Dispatch removeFromCart action
//     };

//     const handleCheckout = () => {
//         dispatch(checkout());
//     };

//     if (cartError) {
//         return <p>Error loading cart: {cartError}</p>;
//     }

//     const handleLogin = () => {
//         navigate('/login'); // Redirect to the login page
//       };

//       return (
//         <div className="shopping-cart-container flex">
//           {/* Session Expired Modal */}
//           {sessionExpired && (
//             <div className="modal-backdrop">
//               <div className="modal">
//                 <h2>Session Expired</h2>
//                 <p>Your session has expired. Please log in again.</p>
//                 <button onClick={handleLogin} className="btn btn-primary">
//                   Log In
//                 </button>
//               </div>
//             </div>
//           )}
    
//           <div className="cart-items w-2/3 p-4">
//             <h2>Your Cart</h2>
//             <ul>
//               {cart.length === 0 ? (
//                 <p>Your cart is empty</p>
//               ) : (
//                 cart.map(item => (
//                   <li key={item.productId._id} className="flex justify-between items-center">
//                     <img src={item.productId.imageUrl} alt={item.productId.title} className="w-16 h-16" />
//                     <div>
//                       <p>{item.productId.title}</p>
//                       <p>${item.productId.price.toFixed(2)}</p>
//                     </div>
//                     <select
//                       value={item.quantity}
//                       onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
//                     >
//                       {[1, 2, 3, 4, 5].map(qty => (
//                         <option key={qty} value={qty}>{qty}</option>
//                       ))}
//                     </select>
//                     <button 
//                       onClick={() => handleRemoveItem(item.productId._id)} 
//                       className="bg-red-500 text-white p-1 rounded ml-4"
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>
    
//           <div className="order-summary w-1/3 p-4">
//             <h2>Order Summary</h2>
//             {cart.length === 0 ? (
//               <p>No items to summarize</p>
//             ) : (
//               <>
//                 <ul>
//                   {cart.map(item => (
//                     <li key={item.productId._id} className="flex justify-between">
//                       <span>{item.productId.title}</span>
//                       <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="flex justify-between">
//                   <span>Total</span>
//                   <span>${totalAmount.toFixed(2)}</span>
//                 </div>
//                 <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">
//                   Checkout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       );
//     };
    


//     return (
//         <div className="shopping-cart-container flex">
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
//                                         <option key={qty} value={qty}>{qty}</option>
//                                     ))}
//                                 </select>
//                                 <button 
//                                     onClick={() => handleRemoveItem(item.productId._id)} 
//                                     className="bg-red-500 text-white p-1 rounded ml-4"
//                                 >
//                                     Remove
//                                 </button>
//                             </li>
//                         ))
//                     )}
//                 </ul>
//             </div>

//             <div className="order-summary w-1/3 p-4">
//                 <h2>Order Summary</h2>
//                 {cart.length === 0 ? (
//                     <p>No items to summarize</p>
//                 ) : (
//                     <>
//                         <ul>
//                             {cart.map(item => (
//                                 <li key={item.productId._id} className="flex justify-between">
//                                     <span>{item.productId.title} x{item.quantity}</span>
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


export default ShoppingCart;