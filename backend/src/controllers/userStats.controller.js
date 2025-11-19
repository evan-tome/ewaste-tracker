import db from "../../config/db.js";

export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Total weight
    const [weightRows] = await db.query(
      `SELECT COALESCE(SUM(weight), 0) AS total_weight
       FROM RecycledItems
       WHERE user_id = ?`,
      [userId]
    );

    // Total items
    const [itemRows] = await db.query(
      `SELECT COUNT(*) AS total_items
       FROM RecycledItems
       WHERE user_id = ?`,
      [userId]
    );

    // Full item list
    const [items] = await db.query(
      `SELECT item_type, quantity, weight, date_logged
       FROM RecycledItems
       WHERE user_id = ?
       ORDER BY date_logged DESC`,
      [userId]
    );

    res.json({
      total_weight: weightRows[0].total_weight,
      total_items: itemRows[0].total_items,
      items: items
    });

  } catch (err) {
    console.error("Error in getUserStats:", err);
    res.status(500).json({ message: "Server error loading stats" });
  }
};