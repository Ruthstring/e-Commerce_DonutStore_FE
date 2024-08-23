import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";


const Card = ({ title, price, description, imageUrl }) => {
  // State to track if the card is flipped
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to toggle the flip state
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card max-w-sm rounded overflow-visible shadow-lg m-4 mt-20 mb-20">
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front Side */}
        <div className="flip-card-front bg-white w-[300px] mx-auto relative shadow-xl ">
          {/* Image positioned to overflow the card */}
          <div className="relative top-[-40%] left-1/2 transform -translate-x-1/2">
            <img
              className=" object-cover"
              src={imageUrl}
              alt={title}
            />
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
    </div>
  );
};

export default Card;

// const Card = ({ title, price, description, imageUrl }) => {
//   // State to track if the card is flipped
//   const [isFlipped, setIsFlipped] = useState(false);

//   // Function to toggle the flip state
//   const toggleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   return (
//     <div className="flip-card max-w-sm rounded overflow-visible shadow-lg m-4">
//       <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
//         {/* Front Side */}
//         <div className="flip-card-front bg-white w-[400px] pt-20 mx-auto relative overflow-visible rounded-xl shadow-xl">
//           {/* Image positioned to overflow the card */}
//           <div className="relative top-[-30%]  transform ">
//             <img
//               className="object-cover"
//               src={imageUrl}
//               alt={title}
//             />
//           </div>
//           {/* Content within the card */}
//           <div className="pt-16 px-6 py-4 ">
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


// const Card = ({ title, price, description, imageUrl }) => {
//   // State to track if the card is flipped
//   const [isFlipped, setIsFlipped] = useState(false);

//   // Function to toggle the flip state
//   const toggleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   return (
//     <div className="flip-card max-w-sm rounded overflow-hidden shadow-lg m-4">
//       <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
//         {/* Front Side */}
//         <div className="flip-card-front pt-18 w-[400px] pt-16 mx-auto relative overflow-visible">
//           <img className="w-full -mt-48 overflow-visible " src={imageUrl} alt={title} />
//           <div className="card-content px-6 py-4">
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
//         <div className="flip-card-back px-4 py-4  ">
//           <div className=" card-header">
//           <h2 className="text-2xl font-bold">Product Information</h2>
//           <button
//             onClick={toggleFlip}
//             className="text-white hover:text-gray-200 ml-4 mt-2 absolute top-2 right-4  "
//           >
//             <FontAwesomeIcon icon={faTimes} size="lg" className="cross-icon " />
//           </button>
          
//           </div>
//           <div className="card-body">
//             <p className="text-gray-200 text-base">{description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;



// const Card=({title, price, description, imageUrl})=>{
//     return(
//         <>
//         <div className="flip-card max-w-sm rounded overflow-hidden shadow-lg m-4">
//         <div className="flip-card-inner">
//           <img className="w-full" src={imageUrl} alt={title} />
//           <div className="font-bold text-xl mb-2">{title}</div>
//           <div className="font-bold text-xl mb-2">{price}</div>
        
//         </div>
//       <div className="flip-card-back px-6 py-4">
//         <h1>Product information</h1>
//         <p className="text-gray-700 text-base">{description}</p>
//       </div>
//     </div>
//         </>
//     )
// }
// export default Card;