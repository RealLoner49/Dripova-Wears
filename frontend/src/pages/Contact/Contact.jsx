import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";

import "./Contact.css";

const FORMSPREE_URL =
  "https://formspree.io/f/xdajeyev";

export default function Contact() {
  const [toast, setToast] =
    useState(null);

  const [sending, setSending] =
    useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setSending(true);

    const formData = new FormData(
      e.target
    );

    try {
      const response = await fetch(
        FORMSPREE_URL,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept:
              "application/json",
          },
        }
      );

      if (response.ok) {
        e.target.reset();

        setToast({
          type: "success",
          message:
            "Message sent successfully. We will reply shortly.",
        });
      } else {
        setToast({
          type: "error",
          message:
            "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setToast({
        type: "error",
        message:
          "Network error. Please check your connection.",
      });
    }

    setSending(false);

    setTimeout(() => {
      setToast(null);
    }, 4000);
  }

  return (
    <div className="page contact-page">
      <section className="contact-hero">
        <span className="eyebrow">
          Contact Us
        </span>

        <h1>
          We'd love to hear from you.
        </h1>

        <p>
          Need support, have
          questions about an order,
          want to become a vendor,
          or discuss a partnership?
          Reach out anytime.
        </p>
      </section>

      <div className="contact-layout">
        {/* CONTACT INFO */}
        <div className="contact-info">
          <div className="info-card">
            <Mail size={24} />

            <h3>Email Us</h3>

            <a href="mailto:dripovawears01@gmail.com">
              dripovawears01@gmail.com
            </a>
          </div>

          <div className="info-card">
            <Phone size={24} />

            <h3>Call Us</h3>

            <a href="tel:+2348028084696">
              +234 802 808 4696
            </a>
          </div>

          <div className="info-card">
            <MessageCircle
              size={24}
            />

            <h3>WhatsApp</h3>

            <a
              href="https://wa.me/2348028084696"
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="info-card">
            <MapPin size={24} />

            <h3>Location</h3>

            <span>
              Lagos, Nigeria
            </span>
          </div>

          <div className="info-card">
            <Clock size={24} />

            <h3>
              Business Hours
            </h3>

            <span>
              Monday - Saturday
              <br />
              9:00 AM - 6:00 PM
            </span>
          </div>
        </div>

        {/* FORM */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <h2>
            Send Us A Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Write your message here..."
            required
          />

          <input
            type="hidden"
            name="_subject"
            value="New Contact Message From DRIPOVA WEARS"
          />

          <button
            type="submit"
            className="contact-btn"
            disabled={sending}
          >
            <Send size={18} />

            <span>
              {sending
                ? "Sending..."
                : "Send Message"}
            </span>
          </button>
        </form>
      </div>

      {/* TOAST */}
      {toast && (
        <div
          className={`toast ${
            toast.type
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}