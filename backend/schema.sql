CREATE TABLE baskets (
    id serial PRIMARY KEY,
    uuid uuid DEFAULT gen_random_uuid () UNIQUE,
    name text NOT NULL UNIQUE
);

CREATE TABLE requests (
    id serial PRIMARY KEY,
    basket_uuid uuid NOT NULL REFERENCES baskets (uuid) ON DELETE CASCADE,
    mongo_id integer UNIQUE,
    header text,
    method text,
    query text,
    date_time integer
);
