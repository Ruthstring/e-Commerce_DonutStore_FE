import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateQuantity, checkout, removeFromCart, selectCartItems, selectSessionExpired } from '../features/auth/cart/cartSlice'; // Redux slice for handling cart actions
import SessionExpiredModal from './SessionExpiredModal';
import { useNavigate } from 'react-router-dom';
import Recommendations from './Recommendations';
import ImageTower from "../assets/ImageTower.png"

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
      <div className="shopping-cart-container flex flex-col">
        {!user ? (
          <div className="not-logged-in-message flex ml-4 md:ml-12 mb-20">
            <div className="flex-col ml-0 md:ml-8">
              <h2 className="text-blue-900 text-2xl self-start">Feeling like a donut?</h2>
              <p className="mt-2 mb-10 self-start">Login to access your personal cart.</p>
              <button onClick={handleLogin} className="button">
                Login
              </button>
            </div>
            <div>
              <img src={ImageTower} className="imageTower" alt="Login to continue" />
            </div>
          </div>
        ) : (
          <>
            {/* First row: Cart items and order summary */}
            <div className="flex flex-col md:flex-row w-full space-y-8 md:space-y-0 md:space-x-8">
              {/* Cart items list (2/3 width) */}
              <div className="cart-items w-full md:w-2/3 p-4 md:ml-36">
                <h2 className="text-black">Your Cart</h2>
                <ul>
                  {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    cart.map(item => (
                      <li key={item.productId._id} className="flex justify-between items-center mb-4">
                        <img src={item.productId.imageUrl} alt={item.productId.title} className="w-16 h-16" />
                        <div>
                          <p>{item.productId.title}</p>
                          <p>${item.productId.price.toFixed(2)}</p>
                        </div>
                        <select
                          value={item.quantity}
                          onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                          className="border border-gray-300 p-1"
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
  
              {/* Order summary (1/3 width) */}
              <div className="order-summary w-full md:w-1/3 ">
                <h2 className="text-black">Order Summary</h2>
                {cart.length === 0 ? (
                  <p>No items to summarize</p>
                ) : (
                  <>
                    <ul>
                      {cart.map(item => (
                        <li key={item.productId._id} className="flex justify-between mb-2">
                          <span>{item.productId.title}</span>
                          <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                      <span className="font-bold mt-5">Total</span>
                      <span className="font-bold mt-5" >${totalAmount.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
                    >
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
  
            {/* Second row: Recommendations (full width) */}
            {cart.length > 0 && (
              <div className="w-full mt-8 flex-col  md:ml-36">
                <Recommendations cartItems={cart} />
              </div>
            )}
          </>
        )}
  
        {/* Session Expired Modal */}
        {sessionExpired && <SessionExpiredModal onClose={() => navigate('/login')} />}
      </div>
    );

    // return (

    //     <div className="shopping-cart-container ">
    //   {/* Show a custom message if the user is not logged in */}
    //   {!user ? (
        
        
    //     <div className="not-logged-in-message flex ml-4 md:ml-12 mb-20">
    //       <div className='flex-col ml-0 md:ml-8'>
    //       <h2 className='text-blue-900 text-2xl self-start'>Feeling like a donut?</h2>
    //       <p className="mt-2 mb-10 self-start ">Login to access your personal cart.</p>
    //       <button onClick={handleLogin} className="button">
    //         Login
    //       </button>
    //       </div>
    //       <div>
    //       <img src={ImageTower} className='imageTower'/>
          
    //       </div>
    //     </div>
       
    //   ) : (
    //     <>
    //       {/* Show cart items if the user is logged in */}
    //       <div className="flex">
    //       <div className="cart-items flex ">
    //       <div className=" ">
    //         <h2 className="text-black">Your Cart</h2>
    //         <ul>
    //           {cart.length === 0 ? (
    //             <p>Your cart is empty</p>
    //           ) : (
    //             cart.map(item => (
    //               <li key={item.productId._id} className="flex justify-between items-center">
    //                 <img src={item.productId.imageUrl} alt={item.productId.title} className="w-16 h-16" />
    //                 <div>
    //                   <p>{item.productId.title}</p>
    //                   <p>${item.productId.price.toFixed(2)}</p>
    //                 </div>
    //                 <select
    //                   value={item.quantity}
    //                   onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
    //                 >
    //                   {[1, 2, 3, 4, 5].map(qty => (
    //                     <option key={qty} value={qty}>{qty}</option>
    //                   ))}
    //                 </select>
    //                 <button 
    //                   onClick={() => handleRemoveItem(item.productId._id)} 
    //                   className="bg-red-500 text-white p-1 rounded ml-4"
    //                 >
    //                   Remove
    //                 </button>
    //               </li>
    //             ))
    //           )}
    //         </ul>
    //         </div>
    //       </div>

    //       <div className="order-summary w-1/3 p-4">
    //         <h2 className='text-black'>Order Summary</h2>
    //         {cart.length === 0 ? (
    //           <p>No items to summarize</p>
    //         ) : (
    //           <>
    //             <ul>
    //               {cart.map(item => (
    //                 <li key={item.productId._id} className="flex justify-between">
    //                   <span>{item.productId.title}</span>
    //                   <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //             <div className="flex justify-between">
    //               <span>Total</span>
    //               <span>${totalAmount.toFixed(2)}</span>
    //             </div>
    //             <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">
    //               Checkout
    //             </button>
    //           </>
    //         )}
    //       </div>
    //       </div>
    //     </>
    //   )}

    //   {/* Session Expired Modal */}
    //   {sessionExpired && <SessionExpiredModal onClose={() => navigate('/login')} />}

    // {/* Recommendation Section */}
    // {cart.length > 0 && (
    //     <Recommendations cartItems={cart} />
    //  )}


    // </div>

    // );
};

export default ShoppingCart;