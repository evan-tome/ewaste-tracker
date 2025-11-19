import React, { useEffect, useState } from "react";
import "./PickupForm.css";

const PickupForm = ({ centre, onClose, onSuccess }) => {
  const [userId, setUserId] = useState(null);

  // Load current session user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.user) {
          setUserId(data.user.id);
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
      centre_id: centre.centre_id,
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
    <div className="pickup-overlay">
      <div className="pickup-modal">
        <h2>Request Pickup</h2>
        <p>
          Requesting pickup from:
          <br />
          <strong>{centre.name}</strong>
        </p>

        <button className="pickup-submit" onClick={submitPickupRequest}>
          Confirm Pickup Request
        </button>

        <button className="pickup-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PickupForm;
