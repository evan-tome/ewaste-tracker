USE ewaste_tracker;

-- 1
CREATE OR REPLACE VIEW items_shipped_to_centres AS
SELECT rc.centre_id, rc.name, ri.item_id, ri.item_type, pr.request_id
FROM RecyclingCentres rc
JOIN RecycledItems ri ON rc.centre_id = ri.centre_id
LEFT JOIN PickupRequests pr ON rc.centre_id = pr.centre_id;

-- 2
CREATE OR REPLACE VIEW most_popular_centres AS
SELECT rc.centre_id, rc.name, SUM(ri.quantity) AS total_quantity
FROM RecyclingCentres rc
JOIN RecycledItems ri ON rc.centre_id = ri.centre_id
GROUP BY rc.centre_id, rc.name
HAVING SUM(ri.quantity) > ANY (
    SELECT SUM(ri2.quantity)
    FROM RecycledItems ri2
    GROUP BY ri2.centre_id
)
ORDER BY total_quantity DESC;

-- 3
CREATE OR REPLACE VIEW average_item_quantity AS
SELECT ri.item_ID, ri.item_type, ri.quantity, ri.centre_id,
    (
    SELECT AVG(ri2.quantity)
    FROM RecycledItems ri2
    WHERE ri2.centre_ID = ri.centre_ID
    ) AS avg_centre_quantity
FROM RecycledItems ri;

-- 4
CREATE OR REPLACE VIEW all_centres AS
SELECT 
    rc.centre_id, 
    ri.item_id, 
    ri.item_type, 
    ri.quantity, 
    ri.weight
FROM RecyclingCentres rc
LEFT JOIN RecycledItems ri 
    ON rc.centre_id = ri.centre_id
UNION
SELECT 
    rc.centre_id, 
    ri.item_id, 
    ri.item_type, 
    ri.quantity, 
    ri.weight
FROM RecyclingCentres rc
RIGHT JOIN RecycledItems ri 
    ON rc.centre_id = ri.centre_id;

-- 5
CREATE OR REPLACE VIEW popular_centres_in_canada AS
SELECT rc.name, rc.address
FROM RecyclingCentres rc
WHERE rc.address LIKE '%Canada%'
UNION
SELECT rc.name, rc.address
FROM RecyclingCentres rc
JOIN RecycledItems ri ON rc.centre_id = ri.centre_id
GROUP BY rc.name, rc.address
HAVING SUM(ri.quantity) > 1000;

-- 6
CREATE OR REPLACE VIEW active_users AS
SELECT u.user_id, u.username, u.email, u.points
FROM Users u
WHERE u.points > 300;

-- 7
CREATE OR REPLACE VIEW redeemed_rewards AS
SELECT u.user_id, u.username, u.email, ur.reward_id, ur.date_redeemed, r.reward_name
FROM Users u
JOIN UserRewards ur ON u.user_id = ur.user_id
JOIN Rewards r ON ur.reward_id = r.reward_id
WHERE ur.date_redeemed IS NOT NULL;

-- 8
CREATE OR REPLACE VIEW prestigious_awards AS
SELECT r.reward_id, r.reward_name, r.points_required
FROM Rewards r
WHERE r.points_required > 500;

-- 9
CREATE OR REPLACE VIEW completed_pickups AS
SELECT rc.name AS centre_name, COUNT(pr.request_id) AS completed_count
FROM RecyclingCentres rc JOIN PickupRequests pr ON rc.centre_id = pr.centre_id
WHERE pr.status = 'Completed'
GROUP BY rc.name;

-- 10
CREATE OR REPLACE VIEW pending_pickups AS
SELECT pr.request_id, u.username, rc.name AS centre_name, pr.request_date, pr.status
FROM PickupRequests pr JOIN Users u ON pr.user_id = u.user_id JOIN RecyclingCentres rc ON pr.centre_id = rc.centre_id
WHERE pr.status <> 'Completed';