'use strict';

/**
 * Migration: 20260712000000-initial-schema
 *
 * Establishes the complete baseline schema for the application, incorporating:
 *   - users        : core identity & profile data (title, description retained for future use)
 *   - user_auth    : decoupled auth credentials supporting multiple providers (local, OAuth)
 *   - blogs        : content table with JSONB block content and the `is_published` approval flag
 *
 * The `is_published` column (DEFAULT FALSE) ensures newly created posts require an explicit
 * content-approval step before becoming publicly visible — acting as a safety gate in any
 * query that filters on `WHERE is_published = TRUE`.
 */

const UP_SQL = `
  -- Enable case-insensitive text type for email uniqueness checks
  CREATE EXTENSION IF NOT EXISTS citext;

  -- Core user identity
  CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       citext       UNIQUE NOT NULL,
    title       VARCHAR(255),
    description TEXT,
    role        VARCHAR(50)  NOT NULL DEFAULT 'user',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  -- Validation constraints on users
  ALTER TABLE users
    ADD CONSTRAINT email_validation_check
      CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'),
    ADD CONSTRAINT email_trim_check
      CHECK (email = TRIM(email)),
    ADD CONSTRAINT allowed_roles_check
      CHECK (role IN ('user', 'admin'));

  -- Decoupled auth credentials (local password hash, Google ID, etc.)
  CREATE TABLE user_auth (
    id           SERIAL PRIMARY KEY,
    user_id      INT         NOT NULL,
    provider     VARCHAR(50) NOT NULL,
    provider_key TEXT        NOT NULL
  );

  ALTER TABLE user_auth
    -- A single provider identity can only be linked once across all users
    ADD CONSTRAINT unique_provider_key
      UNIQUE (provider, provider_key),
    ADD CONSTRAINT fk_user
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE;

  -- Blog content with JSONB block structure and publication approval gate
  CREATE TABLE blogs (
    id           SERIAL PRIMARY KEY,
    title        TEXT        NOT NULL,
    description  TEXT        NOT NULL,
    category     TEXT        NOT NULL,
    image_url    TEXT,
    content      JSONB       NOT NULL,
    author_id    INT         NOT NULL,
    slug         TEXT        NOT NULL UNIQUE,
    -- Safety flag: posts must be explicitly approved before becoming public.
    -- Defaults to FALSE so new drafts are never accidentally published.
    is_published BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  ALTER TABLE blogs
    ADD CONSTRAINT fk_author
      FOREIGN KEY (author_id) REFERENCES users(id)
      ON DELETE CASCADE,
    ADD CONSTRAINT title_length_check
      CHECK (char_length(title) >= 5);
`;

const DOWN_SQL = `
  -- Drop in reverse dependency order; CASCADE handles any residual FK references
  DROP TABLE IF EXISTS user_auth, blogs, users CASCADE;

  -- Only drop citext if no other schemas depend on it.
  -- Commented out by default to avoid breaking extensions shared across databases.
  -- DROP EXTENSION IF EXISTS citext;
`;

exports.up = function (db) {
  return db.runSql(UP_SQL);
};

exports.down = function (db) {
  return db.runSql(DOWN_SQL);
};

exports._meta = {
  version: 1,
};
