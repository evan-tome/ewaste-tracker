import React, { useEffect, useState } from "react";
import "./Rewards.css";

function RewardsPage() {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [claimed, setClaimed] = useState([]);
  const [message, setMessage] = useState("");

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

  // Load all rewards
  useEffect(() => {
    const loadRewards = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rewards");
        const data = await res.json();
        setRewards(data);
      } catch (err) {
        console.error("Failed to load rewards:", err);
      }
    };
    loadRewards();
  }, []);

  // Load claimed rewards
  useEffect(() => {
    if (!user) return;

    const loadClaimed = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rewards/user/${user.id}`);
        const data = await res.json();
        setClaimed(data.map((r) => r.reward_name));
      } catch (err) {
        console.error("Failed to load claimed rewards:", err);
      }
    };

    loadClaimed();
  }, [user]);

  // Redeem reward
  const redeemReward = async (reward_id) => {
    try {
      const res = await fetch("http://localhost:5000/api/rewards/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_id: user.id, reward_id }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Reward claimed successfully!");
        // Reload claimed list
        setClaimed((prev) => [...prev, rewards.find((r) => r.reward_id === reward_id).reward_name]);
      } else {
        setMessage(data.message || "Unable to claim reward.");
      }
    } catch (err) {
      console.error("Redeem error:", err);
      setMessage("Server error redeeming reward.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="rewards-container">
      <h1 className="title">Rewards</h1>

      {!user ? (
        <p className="login-warning">You must be logged in to claim rewards.</p>
      ) : (
        <>
          <p className="points-display">
            Your Points: <strong>{user.points}</strong>
          </p>

          <div className="rewards-grid">
            {rewards.map((reward) => {
              const isUnlocked = user.points >= reward.points_required;
              const isClaimed = claimed.includes(reward.reward_name);

              return (
                <div className="reward-card" key={reward.reward_id}>
                  <h3>{reward.reward_name}</h3>
                  <p className="reward-desc">{reward.description}</p>
                  <p className="reward-points">
                    Requires: <strong>{reward.points_required}</strong> points
                  </p>

                  {isClaimed ? (
                    <span className="badge claimed">Claimed</span>
                  ) : isUnlocked ? (
                    <button
                      className="claim-btn"
                      onClick={() => redeemReward(reward.reward_id)}
                    >
                      Claim Reward
                    </button>
                  ) : (
                    <button className="locked-btn" disabled>
                      Locked
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {message && <p className="success-message">{message}</p>}
        </>
      )}
    </div>
  );
}

export default RewardsPage;