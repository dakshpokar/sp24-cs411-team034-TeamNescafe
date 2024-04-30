DELIMITER / / CREATE PROCEDURE complex_stored_procedure_for_filtering(
    IN flag INT,
    IN min_area INT,
    IN max_area INT,
    IN min_price DECIMAL(10, 2),
    IN max_price DECIMAL(10, 2)
) BEGIN IF flag = 1 THEN
SELECT
    review.property_id,
    prop.name,
    prop.pincode,
    AVG(review.rating) AS avg_rating,
    COUNT(review.rating) AS num_reviews
FROM
    reviews review
    JOIN property prop ON prop.property_id = review.property_id
WHERE
    review.property_id IN (
        SELECT
            DISTINCT p.property_id
        FROM
            property p
            JOIN unit u ON p.property_id = u.property_id
        WHERE
            u.availability = 1
            AND u.area >= min_area
            AND u.area <= max_area
    )
GROUP BY
    review.property_id
HAVING
    num_reviews >= 2
ORDER BY
    avg_rating DESC;

ELSEIF flag = 2 THEN
SELECT
    review.property_id,
    prop.name,
    prop.pincode,
    AVG(review.rating) AS avg_rating,
    COUNT(review.rating) AS num_reviews
FROM
    reviews review
    JOIN property prop ON prop.property_id = review.property_id
WHERE
    review.property_id IN (
        SELECT
            DISTINCT p.property_id
        FROM
            property p
            JOIN unit u ON p.property_id = u.property_id
        WHERE
            u.availability = 1
            AND u.price >= min_price
            AND u.price <= max_price
    )
GROUP BY
    review.property_id
HAVING
    num_reviews >= 2
ORDER BY
    avg_rating DESC;

ELSE
SELECT
    review.property_id,
    prop.name,
    prop.pincode,
    AVG(review.rating) AS avg_rating,
    COUNT(review.rating) AS num_reviews
FROM
    reviews review
    JOIN property prop ON prop.property_id = review.property_id
WHERE
    review.property_id IN (
        SELECT
            DISTINCT p.property_id
        FROM
            property p
            JOIN unit u ON p.property_id = u.property_id
        WHERE
            u.availability = 1
            AND u.area >= min_area
            AND u.area <= max_area
            AND u.price >= min_price
            AND u.price <= max_price
    )
GROUP BY
    review.property_id
HAVING
    num_reviews >= 2
ORDER BY
    avg_rating DESC;

END IF;

END / / DELIMITER;