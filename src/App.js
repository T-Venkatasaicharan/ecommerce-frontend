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
  const login = async () => {

  if (!username || !password) {
    alert("Enter username & password ❌");
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

    // ✅ ONLY allow login if success message
    if (data.toLowerCase().includes("login successful")) {
      localStorage.setItem("loggedIn", "true");
      goProducts();
    }

  } catch (err) {
    alert("Server error ❌");
  }

  // ✅ Step 1: validation
  if (!username || !password) {
    alert("Enter username & password ❌");
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

   if (res.ok) {
  goProducts();
}
  } catch (err) {
    alert("Server error ❌");
    console.error(err);
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
    await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    alert("User Registered!");
    goLogin();
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
    <h1 className="title">🛒 Products</h1>

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
  console.log("Checkout clicked"); // 🔥 ADD THIS

  if (!address) {
    alert("Enter address ❌");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  try {
    console.log("Sending request..."); // 🔥 ADD

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

    console.log("Response received", res); // 🔥 ADD

    if (res.ok) {
      alert("Order placed successfully 🎉");
    }

  } catch (err) {
    console.error("Error:", err);
    alert("Error placing order ❌");
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