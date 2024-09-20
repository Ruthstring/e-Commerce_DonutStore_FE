import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/auth/cart/cartSlice';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import SessionExpiredModal from './SessionExpiredModal';

const Featured = () => {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token); // Get the auth token from Redux

    useEffect(() => {
        // Fetch 3 menu items from the backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/featured');
                if (!response.ok) {
                    throw new Error('Failed to fetch featured items');
                }
                const data = await response.json();
                setCardsData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        console.log("Token status:", token); // Log token status to debug
        if (!token) {
            // If the user is not logged in, show the modal
            console.log("No token found, showing modal");
            setShowModal(true);
            return; // Early return to stop the function execution
        }
        
        // Log product being added to the cart
        console.log("Adding to cart:", product);

        // Add to cart if the user is logged in
        const { _id, title, price } = product;
        const quantity = 1; // Default to 1 for adding items to the cart
        dispatch(addToCart({ productId: _id, title, price, quantity }));
    };



    if (loading) {
        return <p>Loading featured items...</p>;
    }

    if (error) {
        return <p>Error loading featured items: {error}</p>;
    }

    return (
        <div id="featured" className="featuredContainer pt-10">
            <div>
                <h1 className="title md:ml-32 lg:ml-20 lilitafont " >This week's specials</h1>
            </div>
            {showModal && <SessionExpiredModal 
                                            onClose={() => setShowModal(false)} 
                                            message="Login to enjoy our delicious donuts!" 
                                            title="Please Log In" 
                                            buttonLabel="Login Now"
              />} 
            <div className="flex flex-wrap justify-center">
                {cardsData.map((card) => (
                    <Card
                        key={card._id}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        productId={card._id}
                        price={card.price}
                        onAddToCart={() => handleAddToCart(card)} // Pass handleAddToCart to each card
                    />
                ))}
            </div>
        </div>
    );
};

export default Featured;

// import React, { useEffect, useState } from 'react';
// import Card from './Card';

// const Featured = () => {
//     const [cardsData, setCardsData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch 3 menu items from the backend
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/featured'); // Backend API
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch featured items');
//                 }
//                 const data = await response.json();
//                 setCardsData(data); // Store the 3 menu items in the state
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <p>Loading featured items...</p>;
//     }

//     if (error) {
//         return <p>Error loading featured items: {error}</p>;
//     }

//     return (
//         <div id="featured" className="featuredContainer p-20">
//             <div className="flex flex-wrap justify-center">
//                 {cardsData.map((card) => (
//                     <Card
//                         key={card._id} // Assuming the _id from MongoDB is the unique identifier
//                         title={card.title}
//                         description={card.description}
//                         imageUrl={card.imageUrl}
//                         productId={card._id} // Pass productId to the card for "Add to Cart"
//                         price={card.price}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Featured;


// import React, { useEffect, useState } from 'react';
// import Card from "./Card";
// import ChocoDonut from "../assets/choco_donut.png"

// //fetching 3 random items for now. future implementation of isFeatured flag or most recent items by timestamp in mongo

// const Featured = () => {
//     // Mock data for demonstration purposes
//     const mockCardsData = [
//       {
//         id: 1,
//         title: 'Chocolate Vegan Donut',
//         description: 'Delicious chocolate glazed vegan donut with sprinkles.',
//         imageUrl: ChocoDonut, 
//       },
//       {
//         id: 2,
//         title: 'Glazed Strawberry Donut',
//         description: 'Sweet and tangy strawberry glazed vegan donut.',
//         imageUrl: 'https://via.placeholder.com/300x200',
//       },
//       {
//         id: 3,
//         title: 'Classic Vegan Donut',
//         description: 'Simple and classic vegan donut, perfect with coffee.',
//         imageUrl: 'https://via.placeholder.com/300x200',
//       },
//     ];
  
//     return (
//       <div id="featured" className="featuredContainer p-20 ">
//         <div className="flex flex-wrap justify-center">
//           {mockCardsData.map((card) => (
            
//             <Card
//               key={card.id}
//               title={card.title}
//               description={card.description}
//               imageUrl={card.imageUrl}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default Featured;