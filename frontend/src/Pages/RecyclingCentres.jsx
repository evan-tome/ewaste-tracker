import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PickupForm from "../Components/Forms/PickupForm";

import "./RecyclingCentres.css";

const RecyclingCentresPage = () => {
  const { role } = useContext(AuthContext);

  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCentre, setSelectedCentre] = useState(null);

  // Search fields
  const [nameSearch, setNameSearch] = useState("");
  const [addressSearch, setAddressSearch] = useState("");

  // Fetch centres
  const fetchCentres = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await fetch(
        `http://localhost:5000/api/centres?${params}`,
        { credentials: "include" }
      );

      const data = await res.json();
      setCentres(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching centres:", err);
    }
  };

  useEffect(() => {
    fetchCentres();
  }, []);

  // Runs when nameSearch or addressSearch changes
  useEffect(() => {
    // Delay search to avoid calling API on every keystroke
    const timeout = setTimeout(() => {
      const filters = {};
      if (nameSearch.trim()) filters.name = nameSearch.trim();
      if (addressSearch.trim()) filters.address = addressSearch.trim();
      fetchCentres(filters);
    }, 350);

    // Clears the timeout if the user types again before 350ms
    return () => clearTimeout(timeout);
  }, [nameSearch, addressSearch]);

  return (
    <div className="page">
      <h1 className="title">Recycling Centres</h1>
      <p className="subtitle">Search for a centre and request a pickup.</p>

      <div className="search-grid">
        <input
          type="text"
          placeholder="Search by name..."
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="search-input"
        />

        <input
          type="text"
          placeholder="Search by address..."
          value={addressSearch}
          onChange={(e) => setAddressSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {message && <div className="message">{message}</div>}

      {loading && <p style={{ textAlign: "center", color: "#555" }}>Loading centres...</p>}

      <div className="card-grid">
        {centres.map((c) => (
          <div key={c.centre_id} className="card">
            <h2>{c.name}</h2>
            <p><strong>📍 Address:</strong> {c.address}</p>
            <p><strong>📮 Postal Code:</strong> {c.postal_code}</p>
            <p><strong>📞 Phone:</strong> {c.phone || "N/A"}</p>

            {/* Open on Google Maps */}
            <button
              className="map-btn"
              onClick={() => {
                const location = `${c.name} ${c.address.split(",").pop().trim()}`;
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
                  "_blank"
                );
              }}
            >
              Open in Google Maps
            </button>

            <button
              className="pickup-btn"
              onClick={() => {
                setSelectedCentre(c);
                setShowForm(true);
              }}
            >
              Request Pickup
            </button>

            {showForm && (
              <PickupForm
                centre={selectedCentre}
                onClose={() => setShowForm(false)}
                onSuccess={(msg) => setMessage(msg)}
              />
            )}
          </div>
        ))}
      </div>

      {!loading && centres.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#777" }}>
          No centres found.
        </p>
      )}
    </div>
  );
};

export default RecyclingCentresPage;
