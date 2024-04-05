SELECT unit.apartment_no, property.property.name, COUNT(*)
FROM Unit unit
JOIN Property property ON property.property_id = unit.property_id 
JOIN Application application ON application.unit_id = unit.unit_id
WHERE application.user_id = (
  SELECT user_id from Tokens where token = <<token>>
)
GROUP BY unit.unit_id;