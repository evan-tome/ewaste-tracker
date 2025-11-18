import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  role: null,
  setRole: () => {},
  loading: true
});

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include"  // IMPORTANT: sends cookies to backend
        });

        if (res.ok) {
          const data = await res.json();
          setRole(data.user.role); // restore role after refresh
        }
      } catch (err) {
        console.log("Session check failed:", err);
      }

      setLoading(false); // finished checking
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, loading }}>
      {!loading && children} 
      {/* Prevents flickering the logged-out navbar */}
    </AuthContext.Provider>
  );
}
