import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import '../src/index.css'


const mockRestaurants = [
  { id: 1, name: "Italian Delight", address: "123 Main St" },
  { id: 2, name: "Sushi Heaven", address: "456 Sushi Ave" },
  { id: 3, name: "Burger Spot", address: "789 Burger Lane" }
];

const mockMenus = {
  1: [
    { id: 101, name: "Margherita Pizza", price: 12 },
    { id: 102, name: "Pasta Alfredo", price: 15 }
  ],
  2: [
    { id: 201, name: "Salmon Roll", price: 10 },
    { id: 202, name: "Tuna Sashimi", price: 14 }
  ],
  3: [
    { id: 301, name: "Cheeseburger", price: 8 },
    { id: 302, name: "Fries", price: 5 }
  ]
};

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRestaurants.map(restaurant => (
          <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Restaurant = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const menu = mockMenus[id] || [];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menu.map(item => (
          <div key={item.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Cart cart={cart} />
    </div>
  );
};

const Cart = ({ cart }) => {
  const checkout = () => {
    alert("Order placed successfully!");
  };

  return (
    <div className="mt-6 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Cart</h2>
      {cart.map((item, index) => (
        <p key={index}>{item.name} - ${item.price}</p>
      ))}
      <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={checkout}>
        Checkout
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white">
        <Link to="/" className="text-lg font-bold">Food Delivery</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </Router>
  );
};

export default App;
