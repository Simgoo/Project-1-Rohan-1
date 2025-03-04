// CheckOut.js
import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../components/NavBar";
import "./styles.css";
import { CartContext } from "../../components/CartContext";

const CheckOut = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const { cart, updateCart } = useContext(CartContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    updateCart();
  }, [updateCart]);

  const clearCart = async () => {
    try {
      const emailResponse = await fetch(
        `https://gtmovies.onrender.com/api/email/${token}/`
      );
      if (!emailResponse.ok) {
        throw new Error("Failed to fetch user email");
      }
      const emailData = await emailResponse.json();
      const userEmail = emailData.user;

      for (const movie of cart.items) {
        const response = await fetch(
          `https://gtmovies.onrender.com/api/cart/${userEmail}/${movie.movie_id}/`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to remove movie ${movie.movie_title} from cart`
          );
        }
      }
      updateCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const deleteFromCart = async (movieId) => {
    try {
      const emailResponse = await fetch(
        `https://gtmovies.onrender.com/api/email/${token}/`
      );
      if (!emailResponse.ok) {
        throw new Error("Failed to fetch user email");
      }
      const emailData = await emailResponse.json();
      const userEmail = emailData.user;

      const response = await fetch(
        `https://gtmovies.onrender.com/api/cart/${userEmail}/${movieId}/`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to remove movie from cart");
      }

      updateCart();
    } catch (error) {
      console.error("Error removing movie from cart:", error);
    }
  };

  const checkOut = async () => {
    try {
      const walletResponse = await fetch(
        `https://gtmovies.onrender.com/api/wallet/${token}/`
      );
      if (!walletResponse.ok) {
        throw new Error("Failed to fetch wallet");
      }
      const walletData = await walletResponse.json();
      const currentWalletBalance = walletData.wallet;

      const totalAmount = cart.items.reduce(
        (total, movie) => total + (movie.price || 0),
        0
      );

      if (currentWalletBalance < totalAmount) {
        alert("Insufficient funds in your wallet.");
        return;
      }

      const emailResponse = await fetch(
        `https://gtmovies.onrender.com/api/email/${token}/`
      );
      if (!emailResponse.ok) {
        throw new Error("Failed to fetch user email");
      }
      const emailData = await emailResponse.json();
      const userEmail = emailData.user;

      for (let movie of cart.items) {
        const deleteResponse = await fetch(
          `https://gtmovies.onrender.com/api/cart/${userEmail}/${movie.movie_id}/`,
          { method: "DELETE" }
        );
        if (!deleteResponse.ok) {
          throw new Error("Failed to remove movie from cart");
        }
      }

      const updatedWalletBalance = currentWalletBalance - totalAmount;
      const updateWalletResponse = await fetch(
        `https://gtmovies.onrender.com/api/wallet/${token}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet: updatedWalletBalance }),
        }
      );
      if (!updateWalletResponse.ok) {
        throw new Error("Failed to update wallet");
      }

      for (let movie of cart.items) {
        const orderResponse = await fetch(`https://gtmovies.onrender.com/api/order/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userEmail, 
            movie: movie.movie_id, 
            movie_title: movie.movie_title, 
            image: movie.image,
          }),
        });

        if (!orderResponse.ok) {
          const errorData = await orderResponse.text();
          console.error("Order creation failed:", errorData);
          throw new Error(`Failed to create order: ${errorData}`);
        }
      }
      updateCart();

      alert("Purchase completed successfully!");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
  };

  return (
    <div>
      <NavBar setIsAuthenticated={setIsAuthenticated} />
      <div className="checkout-container">
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-summary-content">
              {cart.items && cart.items.length > 0 ? (
                cart.items.map((movie) => (
                  <div key={movie.movie_id} className="movie-details">
                    <img
                      src={movie.image}
                      alt={movie.movie_title}
                      className="movie-image"
                    />
                    <div className="movie-info">
                      <h3>{movie.movie_title}</h3>
                      <p>${movie.price.toFixed(2)}</p>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => deleteFromCart(movie.movie_id)}
                    >
                      ❌
                    </button>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
              <div className="total-section">
                <div className="total-wrapper">
                  <h3>
                    Total: $
                    {cart.items
                      ? cart.items
                          .reduce(
                            (total, movie) => total + (movie.price || 0),
                            0
                          )
                          .toFixed(2)
                      : "0.00"}
                  </h3>
                  <button className="clear-cart-button" onClick={clearCart}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Shipping Information</h2>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <div className="form-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="checkout-button"
              onClick={checkOut}
            >
              Complete Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;