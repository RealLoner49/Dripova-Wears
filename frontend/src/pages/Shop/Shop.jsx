import React, {
  useMemo,
  useState,
} from "react";

import { Search } from "lucide-react";

import ProductCard from "../../components/ProductCard/ProductCard.jsx";

import { useProducts } from "../../context/ProductContext.jsx";

import "./Shop.css";

export default function Shop() {
  const {
    products,
    loadingProducts,
  } = useProducts();

  const [query, setQuery] = useState("");

  const [category, setCategory] =
    useState("All");

  const categories = [
    "All",

    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesText = `
        ${product.name}
        ${product.category}
        ${product.description}
      `
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesText &&
        matchesCategory
      );
    });
  }, [products, query, category]);

  return (
    <div className="page">
      <section className="shop-hero">
        <span className="eyebrow">
          Shop
        </span>

        <h1>
          Explore premium wears
        </h1>

        <p>
          Search, filter, hover, and discover
          quality clothes for every style.
        </p>
      </section>

      <div className="shop-toolbar">
        <label className="search-box">
          <Search size={18} />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search clothes..."
          />
        </label>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loadingProducts ? (
        <div className="page-loader">
          Loading clothes...
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}