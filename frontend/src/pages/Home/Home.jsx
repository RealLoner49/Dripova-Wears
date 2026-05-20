import React from "react";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

import ProductCard from "../../components/ProductCard/ProductCard.jsx";

import { useProducts } from "../../context/ProductContext.jsx";

import "./Home.css";

export default function Home() {
  const { products } = useProducts();

  const featured = products
    .filter((product) => product.featured)
    .slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            Premium Clothing Marketplace
          </span>

          <h1>
            Buy and sell clothes with confidence,
            class, and style.
          </h1>

          <p>
            DRIPOVA WEARS gives shoppers a luxury
            online experience and gives admins full
            control over products from Supabase.
          </p>

          <div className="hero-actions">
            <Link
              className="primary-btn"
              to="/shop"
            >
              Shop Collection

              <ArrowRight size={18} />
            </Link>

            <Link
              className="ghost-btn"
              to="/about"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card top">
            New Drops
          </div>

          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
            alt="Fashion model shopping"
          />

          <div className="floating-card bottom">
            Secure Checkout
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div>
          <Sparkles />

          <strong>Luxury UI</strong>

          <span>Premium shopping feel</span>
        </div>

        <div>
          <ShieldCheck />

          <strong>Secure Auth</strong>

          <span>Supabase login/signup</span>
        </div>

        <div>
          <Truck />

          <strong>Fast Updates</strong>

          <span>Admin changes reflect live</span>
        </div>
      </section>

      <section className="section-head">
        <span className="eyebrow">
          Featured
        </span>

        <h2>
          Hot picks for stylish buyers
        </h2>
      </section>

      <div className="product-grid">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}