CREATE TABLE baskets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    name text NOT NULL UNIQUE
);

CREATE TABLE requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    basket_id uuid NOT NULL REFERENCES baskets ON DELETE CASCADE,
    header text,
    method text,
    query text,
    path text,
    date_time integer DEFAULT EXTRACT(EPOCH FROM NOW())::INTEGER
);
