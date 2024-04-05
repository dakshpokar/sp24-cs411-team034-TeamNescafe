SELECT 
    unit.apartment_no,
    unit.bedrooms,
    unit.bathrooms,
    unit.price
    unit.availability,
    property.name,
    property.address,
FROM 
    Unit unit
JOIN Property property ON unit.property_id = property.property_id