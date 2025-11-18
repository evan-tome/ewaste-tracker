import React, { useEffect, useState } from "react";

const PickupForm = ({ centre, onClose, onSuccess }) => {
  const [userId, setUserId] = useState(null);

  // Load the logged-in user's ID from backend session
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include"
        });

        const data = await res.json();
        if (data.user) {
          setUserId(data.user.id);   // store actual user_id
        }
      } catch (err) {
        console.error("Failed to load user session:", err);
      }
    };

    loadUser();
  }, []);

  const submitPickupRequest = async () => {
    if (!userId) {
      alert("You must be logged in to request a pickup.");
      return;
    }

    const payload = {
      user_id: userId,
      centre_id: centre.centre_id
    };

    try {
      const res = await fetch("http://localhost:5000/api/pickups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess("Pickup request submitted!");
        onClose();
      } else {
        alert(data.message || "Pickup request failed.");
      }
    } catch (err) {
      console.error("Pickup request error:", err);
      alert("Server error submitting request.");
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Request Pickup</h2>
        <p>
          Requesting pickup from:<br />
          <strong>{centre.name}</strong>
        </p>

        <button style={submitButton} onClick={submitPickupRequest}>
          Confirm Pickup Request
        </button>

        <button style={cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

// Styles
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
  maxWidth: "90%",
  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
  textAlign: "center",
};

const submitButton = {
  width: "100%",
  padding: "12px",
  background: "#2ecc71",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "15px",
};

const cancelButton = {
  width: "100%",
  padding: "12px",
  background: "#e74c3c",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

export default PickupForm;
