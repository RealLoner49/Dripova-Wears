import React from "react";

import {
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext.jsx";

import "./Cart.css";

export default function Cart() {
  const {
    cart,
    total,
    removeFromCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <ShoppingBag size={80} />

          <h2>Your cart is empty</h2>

          <p>
            Browse our premium collection and add
            some products to your cart.
          </p>

          <Link
            to="/shop"
            className="checkout-btn empty-shop-btn"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <span className="eyebrow">
          Your Bag
        </span>

        <h1>Shopping Cart</h1>

        <p>
          Review your selected products before
          checkout.
        </p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <img
                src={
                  item.image_url ||
                  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
                }
                alt={item.name}
              />

              <div className="cart-info">
                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <span>
                  Qty: {item.qty}
                </span>
              </div>

              <div className="cart-price">
                ₦
                {(
                  Number(item.price || 0) *
                  item.qty
                ).toLocaleString()}
              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCart(item.id)
                }
                title="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>

            <strong>
              {cart.length}
            </strong>
          </div>

          <div className="summary-row">
            <span>Total</span>

            <strong>
              ₦{total.toLocaleString()}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed To Checkout
          </Link>

          <Link
            to="/shop"
            className="continue-link"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}