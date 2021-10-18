#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "test" --dbname "test" <<-EOSQL
SELECT 'CREATE DATABASE test' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test')\gexec
SELECT 'CREATE DATABASE test1' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test1')\gexec
EOSQL

psql -v ON_ERROR_STOP=1 --username "test" --dbname "test" <<-EOSQL
CREATE SCHEMA IF NOT EXISTS "schema"
EOSQL

psql -v ON_ERROR_STOP=1 --username "test" --dbname "test1" <<-EOSQL
CREATE SCHEMA IF NOT EXISTS "schema"
EOSQL
