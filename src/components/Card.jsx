import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/auth/cart/cartSlice"; // Import the addToCart action from the cart slice
import SessionExpiredModal from "./SessionExpiredModal"; // Import the modal

const Card = ({ productId, title, price, description, imageUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to show the modal
  const dispatch = useDispatch(); // Get the Redux dispatch function

  const token = useSelector((state) => state.auth.token); // Get the token from Redux

  // Function to toggle the flip state
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    if (!token) {
      // If the user is not logged in, show the modal
      setShowModal(true);
    } else {
      console.log("Adding to cart:", { productId, title, price, quantity: 1 }); // Log product details
      dispatch(addToCart({ productId, title, price, quantity: 1 })); // Dispatch the action to add this product to the cart with default quantity of 1
    }
  };

  return (
    <div className="flip-card max-w-sm rounded overflow-visible shadow-lg m-4 mt-20 mb-20">
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front Side */}
        <div className="flip-card-front bg-white w-[300px] mx-auto relative shadow-xl ">
          {/* Image positioned to overflow the card */}
          <div className="relative top-[-40%] left-1/2 transform -translate-x-1/2">
            <img className="object-cover" src={imageUrl} alt={title} />
          </div>
          {/* Content within the card */}
          <div className="absolute pt-20 px-6 pb-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <div className="font-bold text-xl mb-2">${price}</div>
            <button
              onClick={toggleFlip}
              className="text-blue-500 hover:text-blue-700 mt-4"
            >
              <FontAwesomeIcon icon={faInfoCircle} size="lg" />
            </button>
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* Back Side */}
        <div className="flip-card-back bg-white text-black px-4 py-4 relative rounded-xl">
          <div className="absolute top-2 right-2">
            <button
              onClick={toggleFlip}
              className="text-black hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-2xl font-bold">Product Information</h2>
            <p className="text-gray-700 text-base mt-4">{description}</p>
          </div>
        </div>
      </div>

      {/* Session Expired Modal */}
      {showModal && (
        <SessionExpiredModal
          onClose={() => setShowModal(false)}
          message="Login to add this delicious donut to your cart!"
          title="Please Log In"
          buttonLabel="Login Now"
        />
      )}
    </div>
  );
};

export default Card;



// import React, {useState} from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../features/auth/cart/cartSlice"; // Import the addToCart action from the cart slice

// const Card = ({ productId, title, price, description, imageUrl }) => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const dispatch = useDispatch(); // Get the Redux dispatch function

//   // Function to toggle the flip state
//   const toggleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   // Function to handle adding the product to the cart
//   const handleAddToCart = () => {
//     console.log('Adding to cart:', { productId, title, price, quantity: 1 }); // Log product details
//     dispatch(addToCart({ productId,  title, price, quantity: 1 })); // Dispatch the action to add this product to the cart with default quantity of 1
//   };

//   return (
//     <div className="flip-card max-w-sm rounded overflow-visible shadow-lg m-4 mt-20 mb-20">
//       <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
//         {/* Front Side */}
//         <div className="flip-card-front bg-white w-[300px] mx-auto relative shadow-xl ">
//           {/* Image positioned to overflow the card */}
//           <div className="relative top-[-40%] left-1/2 transform -translate-x-1/2">
//             <img className="object-cover" src={imageUrl} alt={title} />
//           </div>
//           {/* Content within the card */}
//           <div className="absolute pt-20 px-6 pb-4">
//             <div className="font-bold text-xl mb-2">{title}</div>
//             <div className="font-bold text-xl mb-2">${price}</div>
//             <button
//               onClick={toggleFlip}
//               className="text-blue-500 hover:text-blue-700 mt-4"
//             >
//               <FontAwesomeIcon icon={faInfoCircle} size="lg" />
//             </button>
//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//         {/* Back Side */}
//         <div className="flip-card-back bg-white text-black px-4 py-4 relative rounded-xl">
//           <div className="absolute top-2 right-2">
//             <button
//               onClick={toggleFlip}
//               className="text-black hover:text-gray-600"
//             >
//               <FontAwesomeIcon icon={faTimes} size="lg" />
//             </button>
//           </div>
//           <div className="flex flex-col justify-start items-start">
//             <h2 className="text-2xl font-bold">Product Information</h2>
//             <p className="text-gray-700 text-base mt-4">{description}</p>
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;





// const Card = ({ title, price, description, imageUrl }) => {
//   // State to track if the card is flipped
//   const [isFlipped, setIsFlipped] = useState(false);

//   // Function to toggle the flip state
//   const toggleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   return (
//     <div className="flip-card max-w-sm rounded overflow-visible shadow-lg m-4 mt-20 mb-20">
//       <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
//         {/* Front Side */}
//         <div className="flip-card-front bg-white w-[300px] mx-auto relative shadow-xl ">
//           {/* Image positioned to overflow the card */}
//           <div className="relative top-[-40%] left-1/2 transform -translate-x-1/2">
//             <img
//               className=" object-cover"
//               src={imageUrl}
//               alt={title}
//             />
//           </div>
//           {/* Content within the card */}
//           <div className="absolute pt-20 px-6 pb-4">
//             <div className="font-bold text-xl mb-2">{title}</div>
//             <div className="font-bold text-xl mb-2">${price}</div>
//             <button
//               onClick={toggleFlip}
//               className="text-blue-500 hover:text-blue-700 mt-4"
//             >
//               <FontAwesomeIcon icon={faInfoCircle} size="lg" />
//             </button>
//           </div>
//         </div>
//         {/* Back Side */}
//         <div className="flip-card-back bg-white text-black px-4 py-4 relative rounded-xl">
//           <div className="absolute top-2 right-2">
//             <button
//               onClick={toggleFlip}
//               className="text-black hover:text-gray-600"
//             >
//               <FontAwesomeIcon icon={faTimes} size="lg" />
//             </button>
//           </div>
//           <div className="flex flex-col justify-start items-start">
//             <h2 className="text-2xl font-bold">Product Information</h2>
//             <p className="text-gray-700 text-base mt-4">{description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

