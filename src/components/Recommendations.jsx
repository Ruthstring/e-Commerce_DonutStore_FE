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



     // Handle adding recommended item to the cart
    //  const handleAddToCart = (product) => {
    //     const { _id, title, price } = product;
    //     const quantity = 1; // Default to 1 for adding recommendations to the cart
    //     dispatch(addToCart({ productId: _id, title, price, quantity }));

    //      // After adding to cart, re-fetch the updated cart items
    //      dispatch(getCart());
    // };

    if (loading) {
        return <p>Loading recommendations...</p>;
    }

    if (error) {
        return <p>Error loading recommendations: {error}</p>;
    }

    return (
        <div className="recommendations ">
            <h3>You might also like</h3>
            <ul className='flex'>
                {recommendations.map(item => (
                    <li key={item._id}>
                        <img src={item.imageUrl} alt={item.title} className="w-16 h-16" />
                        <div>{item.title}</div>
                        <div>${item.price.toFixed(2)}</div>

                        <button 
                            onClick={() => handleAddToCart(item)} 
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Add to Cart
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;