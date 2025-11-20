import React, { useState, useEffect } from "react";

const views = [
    { key: "items_shipped", label: "Items Shipped" },
    { key: "most_popular", label: "Most Popular Centres" },
    { key: "average_quantity", label: "Average Item Quantity" },
    { key: "all_centres", label: "All Centres" },
    { key: "popular_canada", label: "Popular in Canada" },
    { key: "active_users", label: "Active Users" },
    { key: "redeemed_rewards", label: "Redeemed Rewards" },
    { key: "prestigious_awards", label: "Prestigious Awards" },
    { key: "completed_pickups", label: "Completed Pickups" },
    { key: "pending_pickups", label: "Pending Pickups" }
];

const userAllowedViews = [
    "most_popular"
];

function ViewsPanel({ user }) {
    const [selectedView, setSelectedView] = useState(null);
    const [data, setData] = useState(null);

    const visibleViews =
        user?.role === "admin"
        ? views
        : views.filter(v =>
            userAllowedViews.includes(v.key) || v.key === "leaderboard"
            );

        useEffect(() => {
            if (!selectedView && visibleViews.length > 0) {
                loadView(visibleViews[0].key);
            }
        }, [visibleViews]);

    const loadView = async (viewKey) => {
        setSelectedView(viewKey);
        setData("loading");

        try {
        const res = await fetch(`http://localhost:5000/api/views/${viewKey}`);
        const json = await res.json();
        setData(json);
        } catch (err) {
        console.error("View fetch error:", err);
        setData("error");
        }
    };

    const exportFile = (type) => {
        window.open(
        `http://localhost:5000/api/export/views/${selectedView}/${type}`,
        "_blank"
        );
    };

    return (
        <div className="box views-box">
        <h2>System Views</h2>

        <div className="view-buttons">
            {visibleViews.map(v => (
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
            {data === "loading" && <p>Loading...</p>}
            {data === "error" && <p>Error loading data.</p>}

            {Array.isArray(data) && data.length > 0 && (
            <>
                {user.role === "admin" && (
                <div className="export-buttons">
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

export default ViewsPanel;
