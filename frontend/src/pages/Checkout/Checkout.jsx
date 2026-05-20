import React, {
  useState,
} from "react";

import {
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { useCart } from "../../context/CartContext.jsx";

import "./Checkout.css";

export default function Checkout() {
  const { cart, total } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  function payWithPaystack() {
    if (!window.PaystackPop) {
      alert("Paystack is still loading. Refresh and try again.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: customer.email,
      amount: total * 100,
      currency: "NGN",
      ref: `DRIPOVA-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customer.name,
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: customer.phone,
          },
          {
            display_name: "Address",
            variable_name: "address",
            value: customer.address,
          },
        ],
      },
      callback: function (response) {
        alert(
          `Payment successful. Reference: ${response.reference}`
        );
      },
      onClose: function () {
        alert("Payment window closed.");
      },
    });

    handler.openIframe();
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h1>No item to checkout</h1>
          <p>Add products to cart first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="checkout-hero">
        <span className="eyebrow">Secure Checkout</span>
        <h1>Complete your order</h1>
        <p>Pay securely with Paystack and complete your DRIPOVA WEARS purchase.</p>
      </section>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={(event) => {
            event.preventDefault();
            payWithPaystack();
          }}
        >
          <h2>Customer Details</h2>

          <label>
            <User size={18} />
            <input
              required
              placeholder="Full name"
              value={customer.name}
              onChange={(event) =>
                setCustomer({
                  ...customer,
                  name: event.target.value,
                })
              }
            />
          </label>

          <label>
            <Mail size={18} />
            <input
              required
              type="email"
              placeholder="Email address"
              value={customer.email}
              onChange={(event) =>
                setCustomer({
                  ...customer,
                  email: event.target.value,
                })
              }
            />
          </label>

          <label>
            <Phone size={18} />
            <input
              required
              placeholder="Phone number"
              value={customer.phone}
              onChange={(event) =>
                setCustomer({
                  ...customer,
                  phone: event.target.value,
                })
              }
            />
          </label>

          <label>
            <MapPin size={18} />
            <textarea
              required
              placeholder="Delivery address"
              value={customer.address}
              onChange={(event) =>
                setCustomer({
                  ...customer,
                  address: event.target.value,
                })
              }
            />
          </label>

          <button className="pay-btn">
            <CreditCard size={18} />
            Pay ₦{total.toLocaleString()}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <img
                src={item.image_url}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>
                <p>Qty: {item.qty}</p>
              </div>

              <strong>
                ₦{(Number(item.price) * item.qty).toLocaleString()}
              </strong>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>
            <strong>₦{total.toLocaleString()}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}