import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Get current user (runs once)
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.log("GET USER ERROR:", error);
        } else {
          setUser(data?.user || null);
        }
      } catch (err) {
        console.log("UNEXPECTED ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  setUser(data.user);

  return {
    ...data.user,
    role: data.user?.user_metadata?.role || 'user'
  };
};

  // 🆕 REGISTER
  const register = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
  email: email.toLowerCase(),
  password,
  options: {
    data: {
      role: 'user'
    }
  }
});

      console.log("SIGNUP RESPONSE:", res);

      if (res.error) {
        console.log("SIGNUP ERROR:", res.error);
        alert(res.error.message);
        throw res.error;
      }

      setUser(res.data?.user || null);
      return {
  ...data.user,
  role: data.user?.user_metadata?.role || 'user'
};
    } catch (err) {
      console.log("REGISTER CATCH ERROR:", err);
      throw err;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};