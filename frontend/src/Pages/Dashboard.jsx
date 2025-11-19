import React, { useEffect, useState } from "react";
import ViewsPanel from "../Components/ViewsPanel";
import ChartsPanel from "../Components/ChartsPanel";
import "./Dashboard.css";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [stats, setStats] = useState(null);

  // Load logged in user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (err) {
        console.error("User load error:", err);
      }
    };
    loadUser();
  }, []);

  // Load pickups for this user
  useEffect(() => {
    if (!user) return;

    const loadPickups = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pickups/${user.id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setPickups(data);
      } catch (err) {
        console.error("Pickup load error:", err);
      }
    };

    loadPickups();
  }, [user]);

  // Load user recycling stats
  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${user.id}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Stats load error:", err);
      }
    };

    loadStats();
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
        alert(data.message || "Failed to cancel pickup.");
      }
    } catch (err) {
      console.error("Cancel pickup error:", err);
      alert("Server error cancelling pickup.");
    }
  };

  if (!user) {
    return (
      <div className="dashboard" style={{ textAlign: "center", marginTop: "150px" }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="dashboard" style={{ marginTop: "150px" }}>
      <h1 className="title">Dashboard</h1>

      {/* Top row: Profile + Pickups */}
      <div className="dashboard-row">
        <div className="dashboard-col">
          <div className="card profile-box">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Member since:</strong>{" "}
              {new Date(user.date_joined).toLocaleDateString()}
            </p>
            <p><strong>Points:</strong> {user.points}</p>
          </div>
        </div>

        <div className="dashboard-col">
          <div className="card pickup-box">
            <h2>Pickup Requests</h2>

            {pickups.length === 0 ? (
              <p>No pickup requests yet.</p>
            ) : (
              pickups.map((p) => (
                <div key={p.request_id} className="pickup-item">
                  <p><strong>Centre:</strong> {p.centre_name}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(p.request_date).toLocaleDateString()}
                  </p>
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
          </div>
        </div>
      </div>

      {/* Middle row: Recycling Stats */}
      <div className="dashboard-row">
        <div className="dashboard-col">
          <div className="card">
            <h2>Recycling Summary</h2>

            {!stats ? (
              <p>Loading stats...</p>
            ) : (
              <>
                <p><strong>Total Weight Recycled:</strong> {stats.total_weight} kg</p>
                <p><strong>Total Items Logged:</strong> {stats.total_items}</p>
              </>
            )}
          </div>
        </div>

        <div className="dashboard-col">
          <div className="card">
            <h2>Your Recycled Items</h2>

            {!stats ? (
              <p>Loading...</p>
            ) : stats.items.length === 0 ? (
              <p>No items logged yet.</p>
            ) : (
              <div className="user-items-table-wrapper">
                <table className="user-items-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Qty</th>
                      <th>Weight (kg)</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.items.map((row, i) => (
                      <tr key={i}>
                        <td>{row.item_type}</td>
                        <td>{row.quantity}</td>
                        <td>{row.weight}</td>
                        <td>{new Date(row.date_logged).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row: Views + Charts */}
      <div className="dashboard-row">
        <div className="dashboard-col">
          <div className="card">
            <ViewsPanel user={user} />
          </div>
        </div>

        {user.role === "admin" && 
          <div className="dashboard-col">
            <div className="card">
            <ChartsPanel user={user} />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default UserDashboard;
