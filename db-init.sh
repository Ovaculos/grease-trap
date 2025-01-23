#!/bin/bash
dropdb grease-trap
createdb grease-trap
psql -d grease-trap < backend/schema.sql
# psql -d grease-trap < backend/lib/seed-data.sql
