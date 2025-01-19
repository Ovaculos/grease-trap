INSERT INTO
    baskets (name)
VALUES
    ('BasketA'),
    ('BasketB');

INSERT INTO requests (basket_id, header, method, query, path)
VALUES
((SELECT id FROM baskets WHERE name = 'BasketA' LIMIT 1), 'Content-Type: application/json', 'GET', 'param1=value1&param2=value2', '/asdas'),
((SELECT id FROM baskets WHERE name = 'BasketA' LIMIT 1), 'Authorization: Bearer token123', 'POST', 'param3=value3', '/asd'),
((SELECT id FROM baskets WHERE name = 'BasketB' LIMIT 1), 'User-Agent: Mozilla/5.0', 'PUT', 'param4=value4', '/asdsa'),
((SELECT id FROM baskets WHERE name = 'BasketB' LIMIT 1), 'Accept: */*', 'DELETE', 'param5=value5', '/asdasd');
