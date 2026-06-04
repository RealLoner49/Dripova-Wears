import React, {
  useMemo,
  useState,
} from "react";

import {
  Edit,
  ImagePlus,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { useProducts } from "../../context/ProductContext.jsx";

import "./Admin.css";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  old_price: "",
  image_url: "",
  description: "",
  sizes: "S,M,L",
  colors: "Black,White",
  stock: 1,
  featured: false,
};

function formatMoneyInput(value) {
  const numbersOnly = String(value)
    .replace(/[^\d]/g, "");

  return numbersOnly
    ? Number(numbersOnly).toLocaleString()
    : "";
}

function parseMoneyInput(value) {
  return Number(
    String(value).replace(/,/g, "") || 0
  );
}

export default function Admin() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [query, setQuery] =
    useState("");

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [form, setForm] =
    useState(emptyForm);

  const [message, setMessage] =
    useState("");

  const filtered = useMemo(() => {
    return products.filter((product) =>
      `
        ${product.name}
        ${product.category}
        ${product.description}
      `
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [products, query]);

  function showToast(text) {
    setToast(text);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function openAdd() {
    setEditing(null);

    setForm(emptyForm);

    setFormOpen(true);
  }

  function openEdit(product) {
    setEditing(product);

    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price
        ? formatMoneyInput(product.price)
        : "",
      old_price:
        product.old_price
          ? formatMoneyInput(
              product.old_price
            )
          : "",
      image_url:
        product.image_url || "",
      description:
        product.description || "",
      sizes: Array.isArray(
        product.sizes
      )
        ? product.sizes.join(",")
        : "S,M,L",

      colors: Array.isArray(
        product.colors
      )
        ? product.colors.join(",")
        : "Black,White",

      stock: product.stock ?? 1,

      featured: Boolean(
        product.featured
      ),
    });

    setFormOpen(true);
  }

  function normalize(payload) {
    return {
      ...payload,

      price: parseMoneyInput(
        payload.price
      ),

      old_price: payload.old_price
        ? parseMoneyInput(
            payload.old_price
          )
        : null,

      stock: Number(
        payload.stock || 0
      ),

      sizes: payload.sizes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      colors: payload.colors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
  }

  async function submit(event) {
    event.preventDefault();

    setMessage("");

    try {
      if (editing) {
        await updateProduct(
          editing.id,
          normalize(form)
        );

        showToast(
          "Product updated successfully."
        );
      } else {
        await addProduct(
          normalize(form)
        );

        showToast(
          "Product added successfully."
        );
      }

      setFormOpen(false);

      setForm(emptyForm);

      setEditing(null);
    } catch (error) {
      showToast(error.message);
    }
  }

  async function handleDelete(product) {
    try {
      await deleteProduct(product.id);

      setDeleteTarget(null);

      showToast(
        "Product deleted successfully."
      );
    } catch (error) {
      showToast(error.message);
    }
  }

  function handleImageSelect(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((currentForm) => ({
        ...currentForm,
        image_url: reader.result,
      }));
    };

    reader.onerror = () => {
      showToast("Could not load that image.");
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="page admin-page">
      <section className="admin-hero">
        <div>
          <span className="eyebrow">
            Admin Control
          </span>

          <h1>
            Manage all clothes from
            Supabase
          </h1>

          <p>
            Add, edit, delete, and
            search products. Changes
            update the live shop.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={openAdd}
        >
          <Plus size={18} />

          Add Product
        </button>
      </section>

      {message && (
        <div className="notice">
          {message}
        </div>
      )}

      <div className="admin-toolbar">
        <label className="search-box">
          <Search size={18} />

          <input
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value
              )
            }
            placeholder="Search existing clothes..."
          />
        </label>
      </div>

      <div className="admin-grid">
        {filtered.map((product) => (
          <article
            className="admin-card"
            key={product.id}
          >
            <img
              src={
                product.image_url ||
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
              }
              alt={product.name}
            />

            <div>
              <span>
                {product.category}
              </span>

              <h3>
                {product.name}
              </h3>

              <p>
                {product.description}
              </p>

              <strong>
                ₦
                {Number(
                  product.price || 0
                ).toLocaleString()}
                {" · "}
                Stock: {product.stock}
              </strong>
            </div>

            <div className="admin-actions">
              <button
                onClick={() =>
                  openEdit(product)
                }
              >
                <Edit size={16} />

                Edit
              </button>

              <button
                className="danger"
                onClick={() =>
                  setDeleteTarget(product)
                }
              >
                <Trash2 size={16} />

                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {formOpen && (
        <div className="modal-overlay">
          <form
            className="product-form"
            onSubmit={submit}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setFormOpen(false)
              }
            >
              <X size={20} />
            </button>

            <h2>
              {editing
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <div className="form-grid">
              {[
                "name",
                "category",
                "price",
                "old_price",
                "stock",
              ].map((field) => (
                <label key={field}>
                  {field.replace(
                    "_",
                    " "
                  )}

                  <input
                    value={
                      form[field]
                    }
                    type={
                      field === "stock"
                        ? "number"
                        : "text"
                    }
                    required={[
                      "name",
                      "category",
                      "price",
                    ].includes(
                      field
                    )}
                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,
                        [field]:
                          field.includes(
                            "price"
                          )
                            ? formatMoneyInput(
                                event
                                  .target
                                  .value
                              )
                            : event
                                .target
                                .value,
                      })
                    }
                  />
                </label>
              ))}
            </div>

            <div className="image-picker">
              <div className="image-preview">
                {form.image_url ? (
                  <img
                    src={form.image_url}
                    alt="Selected product"
                  />
                ) : (
                  <ImagePlus size={34} />
                )}
              </div>

              <div className="image-picker-actions">
                <span>Product picture</span>

                <p>
                  Choose an image from your device gallery.
                </p>

                <label className="file-btn">
                  <ImagePlus size={18} />

                  Select Picture

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                </label>
              </div>
            </div>

            <label>
              Description

              <textarea
                value={
                  form.description
                }
                onChange={(
                  event
                ) =>
                  setForm({
                    ...form,
                    description:
                      event
                        .target
                        .value,
                  })
                }
              />
            </label>

            <div className="form-grid">
              <label>
                Sizes comma separated

                <input
                  value={
                    form.sizes
                  }
                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,
                      sizes:
                        event
                          .target
                          .value,
                    })
                  }
                />
              </label>

              <label>
                Colors comma separated

                <input
                  value={
                    form.colors
                  }
                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,
                      colors:
                        event
                          .target
                          .value,
                    })
                  }
                />
              </label>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={
                  form.featured
                }
                onChange={(
                  event
                ) =>
                  setForm({
                    ...form,
                    featured:
                      event
                        .target
                        .checked,
                  })
                }
              />

              Featured product
            </label>

            <button className="primary-btn full">
              <Save size={18} />

              Save Product
            </button>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay">
          <div className="delete-card">
            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setDeleteTarget(null)
              }
            >
              <X size={20} />
            </button>

            <div className="delete-icon">
              <Trash2 size={28} />
            </div>

            <h2>
              Delete product?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deleteTarget.name}
              </strong>
              ? This will remove it from
              Supabase and the website.
            </p>

            <div className="delete-actions">
              <button
                type="button"
                className="ghost-btn"
                onClick={() =>
                  setDeleteTarget(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-btn danger-btn"
                onClick={() =>
                  handleDelete(deleteTarget)
                }
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </div>
  );
}
