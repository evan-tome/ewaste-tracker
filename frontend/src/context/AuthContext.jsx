import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  role: null,
  setRole: () => {},
  loading: true
});

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include"
        });

        // Always parse JSON safely
        const data = await res.json().catch(() => ({
          loggedIn: false,
          user: null
        }));

        if (data.loggedIn && data.user) {
          setRole(data.user.role || null);
        } else {
          setRole(null);
        }

      } catch (err) {
        console.log("Session check failed:", err);
        setRole(null);  // fallback to guest
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};