import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zafjzucmixwahqxngxrr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZmp6dWNtaXh3YWhxeG5neHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTgwNjgsImV4cCI6MjA5MTQ5NDA2OH0.FUnQot_bkz2m9EHgS9p_nKhl3sjMUHY7kVM0k5UZ63U"; // ⚠️ apni key daal

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
    try {
      const res = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (res.error) {
        console.log("LOGIN ERROR:", res.error);
        alert(res.error.message);
        throw res.error;
      }

      setUser(res.data?.user || null);
      return res.data?.user;
    } catch (err) {
      console.log("LOGIN CATCH ERROR:", err);
      throw err;
    }
  };

  // 🆕 REGISTER
  const register = async (email, password) => {
    try {
      const res = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
      });

      console.log("SIGNUP RESPONSE:", res);

      if (res.error) {
        console.log("SIGNUP ERROR:", res.error);
        alert(res.error.message);
        throw res.error;
      }

      setUser(res.data?.user || null);
      return res.data?.user;
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