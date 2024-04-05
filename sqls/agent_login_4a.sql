SELECT
    property.property_id,
    property.name
FROM
    Property property
WHERE property.company_id = (
    SELECT acr.company_id FROM AgentCompanyRelation acr WHERE acr.user_id = (
        SELECT user_id FROM Tokens WHERE token = <<token>>
    )
)
