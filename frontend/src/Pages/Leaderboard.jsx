import React, { useEffect, useState } from "react";
import "./Dashboard";

function Leaderboard({ user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load leaderboard
  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/views/leaderboard");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      setData("error");
    }
    setLoading(false);
  };

  const exportFile = (type) => {
    window.open(
      `http://localhost:5000/api/export/views/leaderboard/${type}`,
      "_blank"
    );
  };

  return (
    <div className="dashboard" style={{ marginTop: "150px" }}>
      <h1 className="title">Leaderboard</h1>

      <div className="card" style={{ padding: "20px" }}>
        {loading && <p>Loading...</p>}
        {data === "error" && <p>Error loading leaderboard.</p>}

        {Array.isArray(data) && data.length > 0 && (
          <>
            {user?.role === "admin" && (
              <div className="export-buttons" style={{ marginBottom: "10px" }}>
                <button onClick={() => exportFile("csv")}>Export CSV</button>
                <button onClick={() => exportFile("pdf")}>Export PDF</button>
              </div>
            )}

            <table className="view-table">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key.replace(/_/g, " ")}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val ?? "N/A"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
