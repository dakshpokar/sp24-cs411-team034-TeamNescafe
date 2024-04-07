SELECT 
    review.property_id, 
    prop.name,
    prop.pincode,
    AVG(review.rating) as avg_rating,
    COUNT(review.rating) as num_reviews
FROM
    reviews review
JOIN
    property prop ON prop.property_id = review.property_id
WHERE 
    review.property_id IN (
        SELECT 
            DISTINCT property.property_id 
        FROM property 
        JOIN 
            unit ON property.property_id = unit.property_id 
        WHERE 
            unit.availability = 1 
            AND unit.area >= 600 
            AND unit.area <= 800
    )
GROUP BY 
    review.property_id
HAVING
    num_reviews >= 2
ORDER BY 
    avg_rating DESC
LIMIT 15;