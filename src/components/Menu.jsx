import React, { useState, useEffect } from 'react';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([
        { id: 1, title: 'Item 1', description: 'Description for Item 1', price: 10.00 },
        { id: 2, title: 'Item 2', description: 'Description for Item 2', price: 15.00 },
        { id: 3, title: 'Item 3', description: 'Description for Item 3', price: 12.00 }
    ]);

    // Replace with fetching from API when backend is ready
    useEffect(() => {
        // Uncomment the below lines and remove mock data when backend is ready
        /*
        fetch('/api/menu')
            .then(response => response.json())
            .then(data => setMenuItems(data))
            .catch(error => console.error('Error fetching menu:', error));
        */
    }, []);

    return (
        <div>
            <h1>Our Menu</h1>
            <ul className="menu">
                {menuItems.map(item => (
                    <li key={item.id} className="menu-item">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span>${item.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;