import React from "react";

import {
  Sparkles,
  Users,
  Zap,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Crown,
  Star,
} from "lucide-react";

import "./About.css";

export default function About() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div>
          <span className="eyebrow">
            About Dripova
          </span>

          <h1>
            Fashion commerce built for modern buyers,
            stylish sellers, and premium brands.
          </h1>

          <p>
            DRIPOVA WEARS is a premium clothing
            marketplace designed to make online fashion
            shopping feel smooth, secure, and luxury.
          </p>
        </div>

        <div className="about-hero-card">
          <Crown size={42} />

          <h3>Premium Fashion Experience</h3>

          <p>
            Clean products, smooth checkout, admin control,
            and a modern UI made for serious fashion brands.
          </p>
        </div>
      </section>

      <section className="about-grid">
        <div>
          <Sparkles />

          <h3>Premium Brand Feel</h3>

          <p>
            Dark/light theme, strong spacing, beautiful
            product cards, hover effects, and smooth UI.
          </p>
        </div>

        <div>
          <Users />

          <h3>User Friendly</h3>

          <p>
            Customers can browse, login, add to cart, and
            checkout with a simple shopping flow.
          </p>
        </div>

        <div>
          <Zap />

          <h3>Admin Powered</h3>

          <p>
            Admin email unlocks a private dashboard connected
            to Supabase for product management.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div>
          <span className="eyebrow">
            Our Mission
          </span>

          <h2>
            Make buying and selling clothes easier,
            faster, and more trustworthy.
          </h2>
        </div>

        <p>
          DRIPOVA WEARS gives customers a premium place to
          discover fashion products while giving the business
          owner full control over products, prices, stock, and
          featured items directly from the admin dashboard.
        </p>
      </section>

      <section className="about-stats">
        <div>
          <strong>24/7</strong>
          <span>Online shopping</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>Supabase powered</span>
        </div>

        <div>
          <strong>Fast</strong>
          <span>Product updates</span>
        </div>

        <div>
          <strong>Secure</strong>
          <span>Login & checkout</span>
        </div>
      </section>

      <section className="about-features">
        <div className="feature-card large">
          <ShieldCheck />

          <h3>Secure Customer Login</h3>

          <p>
            Customers must login before adding items to cart,
            helping create a safer and more personal shopping
            experience.
          </p>
        </div>

        <div className="feature-card">
          <ShoppingBag />

          <h3>Premium Shop</h3>

          <p>
            Products are displayed with strong visuals,
            category filters, prices, and detailed product
            modals.
          </p>
        </div>

        <div className="feature-card">
          <Truck />

          <h3>Order Ready</h3>

          <p>
            Cart and checkout pages are ready for payments,
            delivery details, and future order tracking.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <Star />

        <h2>
          Dripova is not just a clothing site. It is a
          premium fashion shopping experience.
        </h2>

        <p>
          Built for style, trust, and smooth online sales.
        </p>
      </section>
    </div>
  );
}