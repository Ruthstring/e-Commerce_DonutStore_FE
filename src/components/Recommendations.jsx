import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../features/auth/cart/recommendationSlice';
import { addToCart,getCart } from '../features/auth/cart/cartSlice';

const Recommendations = ({ cartItems }) => {
    const dispatch = useDispatch();

    // Get recommendations from the Redux store
    const recommendations = useSelector(state => state.recommendations.items);
    const loading = useSelector(state => state.recommendations.loading);
    const error = useSelector(state => state.recommendations.error);

    // Fetch recommendations when the cart items change
    useEffect(() => {
        if (cartItems.length > 0) {
            dispatch(fetchRecommendations(cartItems));
        }
    }, [cartItems, dispatch]);

    // Handle adding recommended item to the cart
    const handleAddToCart = async (product) => {
    const { _id, title, price } = product;
    const quantity = 1; // Default to 1 for adding recommendations to the cart

    try {
        // Dispatch the addToCart action
        await dispatch(addToCart({ productId: _id, title, price, quantity }));

        // After adding to cart, immediately fetch the updated cart items
        dispatch(getCart());

    } catch (error) {
        console.error('Failed to add item to cart:', error);
    }
};



    if (loading) {
        return <p>Loading recommendations...</p>;
    }

    if (error) {
        return <p>Error loading recommendations: {error}</p>;
    }

    return (
        <>
        
        <div className="recommendations flex flex-col items-center  mb-28 ">
        <div>
            <h3 className="title-container title lilitafont ">You might also like</h3>
            </div> 
            <ul className='flex md:overflow-hidden overflow-x-scroll whitespace-nowrap md:mr[100px] '>
                {recommendations.map(item => (
                    <div className="recommendation-card rounded shadow-lg m-4   mb-20 inline-block flex-shrink-0 ">
                    <li key={item._id} className='flex flex-col items-center'>
                        <img src={item.imageUrl} alt={item.title} className="w-28 h-28 mb-3 " />
                        <div className="text-lg font-bold">{item.title}</div>
                        <div>${item.price.toFixed(2)}</div>

                        <button 
                            onClick={() => handleAddToCart(item)} 
                            className="button mb-4 ml-8 mr-8 mt-4 "
                        >
                            Add to Cart
                        </button>

                    </li>
                    </div>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Recommendations;