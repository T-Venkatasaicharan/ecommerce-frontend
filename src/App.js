import React, { useState } from 'react';
import "./App.css";
const BASE_URL = "https://ecommerce-backend-v764.onrender.com";
function App() {
  const [page, setPage] = useState(
  localStorage.getItem("loggedIn") ? "products" : "login"
);
  const [cart, setCart] = useState([]);

  return (
    <div>

      {/* 🔥 NAVBAR (only after login) */}
      {page !== "login" && page !== "register" && (
        <div className="navbar">
          <h2>Ecommerce</h2>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => {
  localStorage.removeItem("loggedIn");
  setPage("login");
}}>
  Logout
</button>
        </div>
      )}

      {/* 🔥 HERO (only products page) */}
      {page === "products" && (
        <div className="hero">
          <h1>It's Time to Pick 🛒</h1>
          <h2>It depends on your vibe ✨</h2>
        </div>
      )}

      {/* 🔥 PAGES */}
      {page === "login" && (
        <Login 
          goRegister={() => setPage("register")} 
          goProducts={() => setPage("products")} 
        />
      )}

      {page === "register" && (
        <Register goLogin={() => setPage("login")} />
      )}

      {page === "products" && (
        <Products 
          goCart={() => setPage("cart")} 
          cart={cart} 
          setCart={setCart} 
        />
      )}

      {page === "cart" && (
        <Cart 
          goProducts={() => setPage("products")} 
          cart={cart} 
        />
      )}

    </div>
  );
}

//////////////// LOGIN //////////////////
function 
Login({ goRegister, goProducts }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const register = async () => {

  if (!username || !password) {
    alert("Enter username & password ");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.text();
    alert(data);

  } catch (err) {
    alert("Error registering ");
  }
};

 return (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>

      <input
  className="input"
  placeholder="Username"
  onChange={(e) => setUsername(e.target.value)}
/>

<input
  className="input"
  type="password"
  placeholder="Password"
  onChange={(e) => setPassword(e.target.value)}
/>

<button className="login-btn" onClick={login}>
  Login
</button>

      <p onClick={goRegister}>
        New user? Register
      </p>
    </div>
  </div>
);
}

//////////////// REGISTER //////////////////
function Register({ goLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

  if (!username || !password) {
    alert("Enter username & password ");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.text();
    alert(data);

  } catch (err) {
    alert("Error registering ");
  }
};

  return (
    <div>
      <h2>Register</h2>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" /><br /><br />
      <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" /><br /><br />
      <button onClick={register}>Register</button><br /><br />
      <p onClick={goLogin} style={{ color: "blue", cursor: "pointer" }}>Already have account? Login</p>
    </div>
  );
}

//////////////// PRODUCTS //////////////////
// ✅ FIRST declare data
const demoProducts = [
  {
    id: 1,
    name: "iPhone 14 pro",
    price: 57999,
    image: "https://cdn.pixabay.com/photo/2022/09/25/22/25/iphones-7479304_1280.jpg"
  },
  {
    id: 2,
    name: "AirPods Pro",
    price: 50000,
    image: "https://cdn.pixabay.com/photo/2021/02/13/03/30/airpods-6010255_1280.jpg"
  },
  {
    id: 3,
    name: "Samsung s22",
    price: 50000,
    image: "https://cdn.pixabay.com/photo/2022/03/12/09/23/smartphone-7063761_1280.jpg"
  },
  {
    id: 4,
    name: "Watch",
    price: 26000,
    image: "https://cdn.pixabay.com/photo/2017/03/20/15/13/wrist-watch-2159351_1280.jpg"
  },
  {
    id: 5,
    name: "Olympus CAMERA",
    price: 150000,
    image: "https://cdn.pixabay.com/photo/2015/10/20/14/40/camera-997813_1280.jpg"
  },
  {
    id: 6,
    name: "LG Tv",
    price: 50000,
    image: "https://cdn.pixabay.com/photo/2017/04/07/12/58/lion-2210947_1280.jpg"
  },
  {
    id: 7,
    name: "Apple Watch",
    price: 760000,
    image: "https://cdn.pixabay.com/photo/2017/08/02/00/44/lifestyle-2569185_1280.jpg"
  },
  {
    id: 8,
    name: "H&M Shirt",
    price: 1999,
    image: "https://image.hm.com/assets/hm/f6/54/f6547497c93fd708d17f8e7c10d9e554cb26bd0a.jpg?imwidth=1260"
  },
  {
    id: 9,
    name: "Hoodie",
    price: 1800,
    image: "https://cdn.pixabay.com/photo/2018/04/27/04/06/woman-3353711_1280.jpg"
  },
  {
    id: 10,
    name: "Cooling Glases",
    price: 20000,
    image: "https://media.istockphoto.com/id/835943906/photo/studio-shot-on-white-background-blue-sunglasses.jpg?s=2048x2048&w=is&k=20&c=SGtl6JlCZ4Ll9LTboAWovbgeKflXxqpbZMkdbq48ZXw="
  },
  {
    id: 11,
    name: "T shirt",
    price: 399,
    image: "https://cdn.pixabay.com/photo/2016/07/29/04/53/monterrey-1550422_1280.jpg"
  },
  {
    id: 12,
    name: "Casual Shirt",
    price: 500,
    image: "https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_1280.jpg"
  },{
    id: 13,
    name: "Red T-Shirt",
    price: 300,
    image: "https://cdn.pixabay.com/photo/2022/01/07/01/21/girl-6920625_1280.jpg"
  },{
    id: 14,
    name: "Hand Bag",
    price: 2300,
    image: "https://cdn.pixabay.com/photo/2016/11/23/18/12/bag-1854148_1280.jpg"
  },
  {
    id: 15,
    name: "Alexa",
    price: 5000,
    image: "https://cdn.pixabay.com/photo/2020/04/19/15/15/google-home-5064088_1280.jpg"
  }
];

// ✅ THEN component
function Products({ goCart, cart, setCart }) {
  const [products] = useState(demoProducts);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

 return (
  <div>
    <h1 className="title"> Products</h1>

    <div className="header">
      <div></div>
      <button className="cart-btn" onClick={goCart}>
        Cart ({cart.length})
      </button>
    </div>

    <div className="products-grid">
      {products.map((p) => (
        <div key={p.id} className="card">
          <img src={p.image} alt={p.name}/>
          <h3>{p.name}</h3>
          <p className="price">₹{p.price}</p>
          <button className="btn" onClick={() => addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

//////////////// CART //////////////////
function Cart({ goProducts, cart }) {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");


  const total = cart.reduce((sum, item) => sum + item.price, 0);

 const checkout = async () => {
  console.log("Checkout clicked"); //  ADD THIS

  if (!address) {
    alert("Enter address ");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  try {
    console.log("Sending request..."); //  ADD

    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      status: "PLACED",
      totalAmount: total,
      userId: 1,
      payment: payment
    })
  });

    console.log("Response received", res); //  ADD

    if (res.ok) {
      alert("Order placed successfully ");
    }

  } catch (err) {
    console.error("Error:", err);
    alert("Error placing order ");
  }
};

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>

      <input
        placeholder="Enter Address"
        onChange={(e) => setAddress(e.target.value)}
      /><br /><br />

      <select onChange={(e) => setPayment(e.target.value)}>
        <option value="">Select Payment</option>
        <option value="COD">Cash on Delivery</option>
      </select><br /><br />

      <button onClick={checkout}>Checkout</button><br /><br />

      <button onClick={goProducts}>Back to Products</button>
    </div>
  );
}
export default App;