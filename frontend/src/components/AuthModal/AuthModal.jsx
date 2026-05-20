import React, {
  useState,
} from "react";

import {
  X,
  Lock,
  Mail,
} from "lucide-react";

import { supabase } from "../../lib/supabase.js";
import { useAuth } from "../../context/AuthContext.jsx";

import "./AuthModal.css";

export default function AuthModal() {
  const {
    authOpen,
    setAuthOpen,
    authMode,
    setAuthMode,
  } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [busy, setBusy] = useState(false);

  if (!authOpen) {
    return null;
  }

  async function submit(event) {
    event.preventDefault();

    setBusy(true);
    setMessage("");

    const email = form.email.trim();
    const password = form.password;

    const payload = {
      email,
      password,
    };

    const result =
      authMode === "signup"
        ? await supabase.auth.signUp(payload)
        : await supabase.auth.signInWithPassword(payload);

    setBusy(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (authMode === "signup") {
      setMessage(
        "Account created successfully. Please login now."
      );

      setAuthMode("login");

      return;
    }

    setMessage("Welcome back.");

    setTimeout(() => {
      setAuthOpen(false);
    }, 700);
  }

  function closeModal() {
    setAuthOpen(false);

    setMessage("");

    setForm({
      email: "",
      password: "",
    });
  }

  return (
    <div className="modal-overlay">
      <form
        className="auth-card"
        onSubmit={submit}
      >
        <button
          type="button"
          className="modal-close"
          onClick={closeModal}
        >
          <X size={20} />
        </button>

        <div className="auth-icon">
          <Lock />
        </div>

        <h2>
          {authMode === "login"
            ? "Login to continue"
            : "Create your account"}
        </h2>

        <p>
          {authMode === "login"
            ? "Login to add clothes to cart and continue shopping."
            : "Create an account, then login with the same details."}
        </p>

        <label>
          <Mail size={16} />

          <input
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
          />
        </label>

        <label>
          <Lock size={16} />

          <input
            type="password"
            placeholder="Password"
            minLength="6"
            required
            value={form.password}
            onChange={(event) =>
              setForm({
                ...form,
                password: event.target.value,
              })
            }
          />
        </label>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <button
          className="primary-btn full"
          disabled={busy}
        >
          {busy
            ? "Please wait..."
            : authMode === "login"
              ? "Login"
              : "Create Account"}
        </button>

        <button
          type="button"
          className="switch-auth"
          onClick={() => {
            setMessage("");

            setAuthMode(
              authMode === "login"
                ? "signup"
                : "login"
            );
          }}
        >
          {authMode === "login"
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
}