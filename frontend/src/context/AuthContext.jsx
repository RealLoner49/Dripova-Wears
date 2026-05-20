import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  supabase,
  ADMIN_EMAIL,
} from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  const [authOpen, setAuthOpen] = useState(false);

  const [authMode, setAuthMode] = useState("login");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session || null);

        setLoading(false);
      });

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const user = session?.user ?? null;

  const isLoggedIn =
    !!session &&
    !!session.user;

  const isAdmin =
    user?.email?.toLowerCase() ===
    ADMIN_EMAIL?.toLowerCase();

  const openAuth = (mode = "login") => {
    setAuthMode(mode);

    setAuthOpen(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({
      session,

      user,

      isLoggedIn,

      isAdmin,

      loading,

      authOpen,

      authMode,

      setAuthMode,

      setAuthOpen,

      openAuth,

      signOut,
    }),

    [
      session,
      isLoggedIn,
      isAdmin,
      loading,
      authOpen,
      authMode,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};