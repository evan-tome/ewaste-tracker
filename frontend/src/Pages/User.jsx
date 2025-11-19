import React, { useEffect, useState } from 'react';
import "./User.css";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);

  // Views state
  const [selectedView, setSelectedView] = useState(null);
  const [viewData, setViewData] = useState(null);

  // Views config
  const views = [
    { key: "items-shipped", label: "Items Shipped" },
    { key: "most-popular", label: "Most Popular Centres" },
    { key: "average-quantity", label: "Average Item Quantity" },
    { key: "all-centres", label: "All Centres" },
    { key: "popular-canada", label: "Popular in Canada" },
    { key: "active-users", label: "Active Users" },
    { key: "redeemed-rewards", label: "Redeemed Rewards" },
    { key: "prestigious-awards", label: "Prestigious Awards" },
    { key: "completed-pickups", label: "Completed Pickups" },
    { key: "pending-pickups", label: "Pending Pickups" },
    { key: "leaderboard", label: "Leaderboard" }
  ];

  // Show only some views to regular users (customize this)
  const allowedViewsForUser = [
    "items-shipped",
    "most-popular",
    "all-centres",
    "leaderboard"
  ];

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (err) {
        console.error("Failed to load user session:", err);
      }
    };

    fetchUser();
  }, []);

  // Fetch user pickup requests
  useEffect(() => {
    if (!user) return;

    const fetchPickups = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pickups/${user.id}`, {
          credentials: "include",
        });

        const data = await res.json();
        setPickups(data);
      } catch (err) {
        console.error("Failed to load pickups:", err);
      }
    };

    fetchPickups();
  }, [user]);

  // Cancel pickup request
  const cancelPickup = async (requestId) => {
    if (!window.confirm("Are you sure you want to cancel this pickup?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/pickups/${requestId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setPickups((prev) => prev.filter((p) => p.request_id !== requestId));
      } else {
        alert(data.message || "Failed to cancel request.");
      }
    } catch (err) {
      console.error("Cancel pickup error:", err);
      alert("Server error cancelling request.");
    }
  };

  // Fetch selected view
  const loadView = async (viewKey) => {
    setSelectedView(viewKey);
    setViewData("loading");

    try {
      const res = await fetch(`http://localhost:5000/api/views/${viewKey}`);
      const data = await res.json();
      setViewData(data);
    } catch (err) {
      console.error("Failed to fetch view:", err);
      setViewData("error");
    }
  };

  // Hide landing page
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    const programs = document.querySelector('.programs');
    const title = document.querySelector('#about-us-section');

    if (hero) hero.style.display = 'none';
    if (about) about.style.display = 'none';
    if (programs) programs.style.display = 'none';
    if (title) title.style.display = 'none';

    return () => {
      if (hero) hero.style.display = '';
      if (about) about.style.display = '';
      if (programs) programs.style.display = '';
      if (title) title.style.display = '';
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-column">

        <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>

        {!user ? (
          <p>Loading profile...</p>
        ) : (
          <>
            {/* PROFILE */}
            <section className="profile-box">
              <h2>Profile</h2>
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member since:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </section>

            {/* PICKUP REQUESTS */}
            <section className="pickup-box">
              <h2>Pickup Requests</h2>

              {pickups.length === 0 ? (
                <p>No pickup requests yet.</p>
              ) : (
                pickups.map((p) => (
                  <div key={p.request_id} className="pickup-item">
                    <p><strong>Centre:</strong> {p.centre_name}</p>
                    <p><strong>Date:</strong> {new Date(p.request_date).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {p.status}</p>

                    {p.status !== "Completed" && (
                      <button
                        className="cancel-btn"
                        onClick={() => cancelPickup(p.request_id)}
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* VIEWS SECTION */}
            <section className="views-box">
              <h2>System Views</h2>

              <div className="view-buttons">
                {(user.role === "admin"
                  ? views
                  : views.filter(v => allowedViewsForUser.includes(v.key))
                ).map(v => (
                  <button
                    key={v.key}
                    className={`view-btn ${selectedView === v.key ? "active" : ""}`}
                    onClick={() => loadView(v.key)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <div className="view-output">
                {viewData === "loading" && <p>Loading...</p>}
                {viewData === "error" && <p>Error loading data.</p>}

                {/* No data */}
                {Array.isArray(viewData) && viewData.length === 0 && (
                  <p>No data available.</p>
                )}

                {/* Table rendering */}
                {Array.isArray(viewData) && viewData.length > 0 && (
                  <table className="view-table">
                    <thead>
                      <tr>
                        {Object.keys(viewData[0]).map((key) => (
                          <th key={key}>{key.replace(/_/g, " ")}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {viewData.map((row, idx) => (
                        <tr key={idx}>
                          {Object.values(row).map((val, i) => (
                            <td key={i}>{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;