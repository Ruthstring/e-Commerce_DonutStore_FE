import React, { useState, useEffect } from 'react';
import Card from './Card';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');  // State to hold the search term
    const [filteredItems, setFilteredItems] = useState([]);  // State to hold the filtered items

    useEffect(() => {
        fetch("http://localhost:5000/api/menu")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setMenuItems(data);
                setFilteredItems(data);  // Initially, show all items
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        filterItems(value);
    };

    // Function to filter items based on category or search term
    const filterItems = (filter) => {
        if (filter) {
            const filtered = menuItems.filter(item =>
                item.categories.some(category =>
                    category.toLowerCase().includes(filter.toLowerCase())
                )
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(menuItems);  // Show all items if no filter
        }
    };

    // Handle category button click
    const handleCategoryClick = (category) => {
        setSearchTerm(category === 'All' ? '' : category);
        filterItems(category === 'All' ? '' : category);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

            {/* Breadcrumb */}
            <div className="mb-4">
                <span className="text-gray-500">Home / </span>
                <span className="text-gray-900">{searchTerm || 'All Menu'}</span>
            </div>

            {/* Category Buttons */}
            <div className="mb-6 flex space-x-4">
                <button
                    onClick={() => handleCategoryClick('All')}
                    className={`px-4 py-2 rounded ${searchTerm === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    All
                </button>
                <button
                    onClick={() => handleCategoryClick('Special')}
                    className={`px-4 py-2 rounded ${searchTerm === 'Special' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Specials
                </button>
                <button
                    onClick={() => handleCategoryClick('Chocolate')}
                    className={`px-4 py-2 rounded ${searchTerm === 'Chocolate' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Chocolate
                </button>
                <button
                    onClick={() => handleCategoryClick('Peanut')}
                    className={`px-4 py-2 rounded ${searchTerm === 'Peanut' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Peanut
                </button>
                <button
                    onClick={() => handleCategoryClick('Strawberry')}
                    className={`px-4 py-2 rounded ${searchTerm === 'Strawberry' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Strawberry
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by category..."
                    className=" p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Display filtered items */}

            {filteredItems.length > 0 ? (
                <ul className="flex flex-wrap justify-center gap-6">
                    {filteredItems.map(item => (
                        <li key={item._id} className="">
                            <Card
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                imageUrl={item.imageUrl || 'default-image-url.jpg'}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-xl text-center text-gray-500">
                    Sorry, not that flavor on the menu at the moment
                </p>
            )}
            {/* {filteredItems.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {filteredItems.map(item => (
                        <li key={item._id} className="min-w-0">
                            <Card
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                imageUrl={item.imageUrl || 'default-image-url.jpg'}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-xl text-center text-gray-500">
                    Sorry, not that flavor on the menu at the moment
                </p>
            )} */}
        </div>
    );
};

export default Menu;

// const Menu = () => {
//     const [menuItems, setMenuItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');  // State to hold the search term
//     const [filteredItems, setFilteredItems] = useState([]);  // State to hold the filtered items

//     useEffect(() => {
//         fetch("http://localhost:5000/api/menu")
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setMenuItems(data);
//                 setFilteredItems(data);  // Initially, show all items
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching menu:', error);
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []);

//     // Function to handle search input change
//     const handleSearchChange = (event) => {
//         const value = event.target.value;
//         setSearchTerm(value);

//         // Filter items based on search term
//         if (value) {
//             const filtered = menuItems.filter(item =>
//                 item.categories.some(category =>
//                     category.toLowerCase().includes(value.toLowerCase())
//                 )
//             );
//             setFilteredItems(filtered);
//         } else {
//             setFilteredItems(menuItems);  // Show all items if search term is empty
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error.message}</p>;
//     }

//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

//             {/* Breadcrumb */}
//             <div className="mb-4">
//                 <span className="text-gray-500">Home / </span>
//                 <span className="text-gray-900">{searchTerm || 'All Menu'}</span>
//             </div>

//             {/* Search Bar */}
//             <div className="mb-6">
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     placeholder="Search by category..."
//                     className=" p-2 border border-gray-300 rounded"
//                 />
//             </div>

//             {/* Display filtered items */}

//             {filteredItems.length > 0 ? (
//                 <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {filteredItems.map(item => (
//                         <li key={item._id} className="min-w-0">
//                             <Card
//                                 title={item.title}
//                                 price={item.price}
//                                 description={item.description}
//                                 imageUrl={item.imageUrl || 'default-image-url.jpg'}
//                             />
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-xl text-center text-gray-500">
//                     Sorry, not that flavor on the menu at the moment
//                 </p>
//             )}
          
//         </div>
//     );
// };

// export default Menu;


// import React, { useState, useEffect } from 'react';
// import Card from "./Card"

// const Menu = () => {
//     const [menuItems, setMenuItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:5000/api/menu")
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setMenuItems(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching menu:', error);
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []); // The dependency array should be at the end of useEffect

//     if (loading) {
//         return <p>Loading...</p>;  // Replace this with a spinner or loader component if desired
//     }

//     if (error) {
//         return <p>Error: {error.message}</p>;  // Show error message if there's an error
//     }
    
// return (
//     <div>
//     <h1>Our Menu</h1>
//     <ul className="menu grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-8 mr-8">
//         {menuItems.map(item => (
//             <li key={item._id} className="menu-item">
//                 <Card
//                     title={item.title}
//                     price={item.price}
//                     description={item.description}
//                     imageUrl={item.imageUrl || 'default-image-url.jpg'} // Use a default image if none is provided
//                 />
//             </li>
//         ))}
//     </ul>
// </div>
// );
// };


// export default Menu;