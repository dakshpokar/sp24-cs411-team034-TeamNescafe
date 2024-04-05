SELECT
    unit.apartment_no,
    unit.bedrooms,
    unit.bathrooms,
    unit.price
    unit.availability
FROM
    Unit unit
WHERE unit.unit_id = <<unit_id>>