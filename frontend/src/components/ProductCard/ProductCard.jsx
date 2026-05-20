import React, {
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

import { useCart } from "../../context/CartContext.jsx";

import "./ProductCard.css";

export default function ProductCard({
  product,
}) {
  const { addToCart } = useCart();

  const [showDetails, setShowDetails] =
    useState(false);

  return (
    <>
      <motion.article
        className="product-card"
        whileHover={{
          y: -8,
          scale: 1.01,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        onClick={() => setShowDetails(true)}
      >
        <div className="product-img">
          <img
            src={
              product.image_url ||
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
            }
            alt={product.name}
          />

          {product.featured && (
            <span className="badge">
              <Sparkles size={14} />
              Featured
            </span>
          )}
        </div>

        <div className="product-info">
          <p className="category">
            {product.category}
          </p>

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <div className="product-bottom">
            <div>
              <strong>
                ₦
                {Number(
                  product.price || 0
                ).toLocaleString()}
              </strong>

              {product.old_price && (
                <del>
                  ₦
                  {Number(
                    product.old_price
                  ).toLocaleString()}
                </del>
              )}
            </div>

            <button
              className="round-buy"
              disabled={
                Number(product.stock) < 1
              }
              onClick={(event) => {
                event.stopPropagation();
                addToCart(product);
              }}
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </motion.article>

      {showDetails && (
        <div className="modal-overlay">
          <div className="product-modal">
            <button
              className="modal-close"
              onClick={() =>
                setShowDetails(false)
              }
            >
              <X size={20} />
            </button>

            <img
              src={
                product.image_url ||
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
              }
              alt={product.name}
            />

            <div className="product-modal-body">
              <span className="category">
                {product.category}
              </span>

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <h3>
                ₦
                {Number(
                  product.price || 0
                ).toLocaleString()}
              </h3>

              <p>
                Stock: {product.stock}
              </p>

              <button
                className="primary-btn full"
                onClick={() =>
                  addToCart(product)
                }
              >
                <ShoppingBag size={18} />
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}