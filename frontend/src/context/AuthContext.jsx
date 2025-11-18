import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  role: null,
  setRole: () => {}
});

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
