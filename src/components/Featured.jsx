import React, { useEffect, useState } from 'react';
import Card from "./Card";
import ChocoDonut from "../assets/choco_donut.png"

// const Featured=()=>{

//     const [cardsData, setCardsData] = useState([]);
    
//     useEffect(() => {
//         // Simulate fetching data from the database
//         const fetchData = async () => {
//           const response = await fetch('http://localhost:5000/api/featured'); // Replace with your API endpoint
//           const data = await response.json();
//           setCardsData(data);
//         };
    
//         fetchData();
//       }, []);

//     return(
//      <featured id="featured">
//         <div className="featuredContainer">
//         <div className="flex flex-wrap justify-center">
//         {cardsData.map((card) => (
//           <Card
//             key={card.id} // Ensure each card has a unique key
//             title={card.title}
//             description={card.description}
//             imageUrl={card.imageUrl}
//           />
//         ))}
//       </div>
//         </div>
       
//      </featured>
//     )
// }

// export default Featured;

const Featured = () => {
    // Mock data for demonstration purposes
    const mockCardsData = [
      {
        id: 1,
        title: 'Chocolate Vegan Donut',
        description: 'Delicious chocolate glazed vegan donut with sprinkles.',
        imageUrl: ChocoDonut, 
      },
      {
        id: 2,
        title: 'Glazed Strawberry Donut',
        description: 'Sweet and tangy strawberry glazed vegan donut.',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        id: 3,
        title: 'Classic Vegan Donut',
        description: 'Simple and classic vegan donut, perfect with coffee.',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ];
  
    return (
      <div id="featured" className="featuredContainer p-20 ">
        <div className="flex flex-wrap justify-center">
          {mockCardsData.map((card) => (
            
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Featured;