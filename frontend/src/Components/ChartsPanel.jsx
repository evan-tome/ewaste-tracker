import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function ChartsPanel() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const pendingRes = await fetch("http://localhost:5000/api/views/pending-pickups");
        const pending = await pendingRes.json();

        const completedRes = await fetch("http://localhost:5000/api/views/completed-pickups");
        const completed = await completedRes.json();

        setStats({
          pendingCount: pending.length,
          completedCount: completed.length
        });

      } catch (err) {
        console.error("Chart load error:", err);
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="box charts-box">
        <p>Loading charts...</p>
      </div>
    );
  }

  return (
    <div className="box charts-box">
      <h2>Analytics</h2>

      <div className="chart-section">
        <h3>Pickup Status Breakdown</h3>

        <Doughnut
          data={{
            labels: ["Pending", "Completed"],
            datasets: [
              {
                data: [stats.pendingCount, stats.completedCount],
                backgroundColor: ["#f39c12", "#27ae60"]
              }
            ]
          }}
        />
      </div>
    </div>
  );
}

export default ChartsPanel;