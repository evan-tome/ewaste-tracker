import React, { useEffect, useState } from "react";
import "./LogItem.css";

function LogItemForm() {
  const [user, setUser] = useState(null);
  const [centres, setCentres] = useState([]);
  const [message, setMessage] = useState(""); // NEW
  const [form, setForm] = useState({
    centre_id: "",
    item_type: "",
    quantity: "",
    weight: ""
  });

  // Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    loadUser();
  }, []);

  // Load recycling centres
  useEffect(() => {
    const loadCentres = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/centres");
        const data = await res.json();
        setCentres(data);
      } catch (err) {
        console.error("Failed to load centres:", err);
      }
    };
    loadCentres();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("You must be logged in to log an item.");
      return;
    }

    const payload = {
      user_id: user.id,
      centre_id: form.centre_id,
      item_type: form.item_type,
      quantity: form.quantity,
      weight: form.weight
    };

    try {
      const res = await fetch("http://localhost:5000/api/ewaste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Item logged successfully! +${data.points_awarded} points`);
        setForm({ centre_id: "", item_type: "", quantity: "", weight: "" });

        // Auto-hide after 4 seconds
        setTimeout(() => setMessage(""), 4000);
      } else {
        setMessage(data.message || "Failed to log item.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Server error submitting item.");
    }
  };

  return (
    <div style={{ textAlign: "center", width: "350px", margin: "150px auto 20px auto" }}>
      <h1 className="title">Log Recycled Item</h1>

      {!user ? (
        <p>Loading user...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="log-item-form">

            <label>Recycling Centre</label>
            <select
              name="centre_id"
              value={form.centre_id}
              onChange={handleChange}
              required
            >
              <option value="">Select centre</option>
              {centres.map((c) => (
                <option key={c.centre_id} value={c.centre_id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>Item Type</label>
            <input
              type="text"
              name="item_type"
              value={form.item_type}
              onChange={handleChange}
              placeholder="e.g. Laptop, Phone, Battery"
              required
            />

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              required
            />

            <label>Total Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              step="0.1"
              min="0"
              required
            />

            <button type="submit" className="submit-btn">
              Log Item
            </button>
          </form>

          {/* Success message at bottom */}
          <br />
          {message && <div className="log-message">{message}</div>}
        </>
      )}
    </div>
  );

}

export default LogItemForm;
