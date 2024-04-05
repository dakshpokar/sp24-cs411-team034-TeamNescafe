SELECT 
    application.created_at, 
    application.status, 
    user.first_name,
    user.last_name,
    user.email,
    user.phone_number
FROM
    User user
JOIN Application application ON user.user_id = application.user_id
WHERE application.unit_id = <<unit_id>>