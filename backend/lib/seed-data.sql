INSERT INTO
    baskets (name)
VALUES
    ('Basket A'),
    ('Basket B');

INSERT INTO requests (basket_uuid, header, method, query, date_time)
VALUES
((SELECT uuid FROM baskets WHERE name = 'Basket A' LIMIT 1), 'Content-Type: application/json', 'GET', 'param1=value1&param2=value2', EXTRACT(EPOCH FROM NOW())::INTEGER),
((SELECT uuid FROM baskets WHERE name = 'Basket A' LIMIT 1), 'Authorization: Bearer token123', 'POST', 'param3=value3', EXTRACT(EPOCH FROM NOW())::INTEGER),
((SELECT uuid FROM baskets WHERE name = 'Basket B' LIMIT 1), 'User-Agent: Mozilla/5.0', 'PUT', 'param4=value4', EXTRACT(EPOCH FROM NOW())::INTEGER),
((SELECT uuid FROM baskets WHERE name = 'Basket B' LIMIT 1), 'Accept: */*', 'DELETE', 'param5=value5', EXTRACT(EPOCH FROM NOW())::INTEGER);
