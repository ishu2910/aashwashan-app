import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;


const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Get current user (runs once)
  useEffect(() => {
  let mounted = true;

  const initializeAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setUser(session?.user ?? null);
      }
    } catch (err) {
      console.log("SESSION ERROR:", err);
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  initializeAuth();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (mounted) {
      setUser(session?.user ?? null);
    }
  });

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    throw error;
  }

  
  return data.user;
};      

  // 🆕 REGISTER
 const register = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
    options: {
      data: {
        role: 'user'
      }
    }
  });

  if (error) {
    throw error;
  }

  
  return data.user;
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