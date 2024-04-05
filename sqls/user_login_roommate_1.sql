SELECT 
    u.user_id,
    (
        (
            SELECT 
                COUNT(*)
            FROM
                userdetails ud
            WHERE
                ud.user_id = u.user_id
            AND ud.value IN (
                SELECT value
                FROM userdetails
                WHERE 
                user_id = 1000
                AND
                ud.pref_id = pref_id
            )
        ) 
            / 
        (
            SELECT 
                COUNT(*) 
            FROM userdetails 
            WHERE user_id = 1000
        )
     ) AS similarity_score
FROM 
    user u
JOIN 
    userdetails ud ON u.user_id = ud.user_id
WHERE 
    u.user_id != 1000
GROUP BY 
    u.user_id
ORDER BY 
    similarity_score DESC
LIMIT 100;