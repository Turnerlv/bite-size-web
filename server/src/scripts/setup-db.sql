DROP TABLE IF EXISTS user_auth, blogs, users CASCADE;

-- Create tables & validation --
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    email citext UNIQUE NOT NULL,
    title varchar(255),
    description TEXT,
    role VARCHAR(50) DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_auth (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_key TEXT NOT NULL
);

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    content JSONB NOT NULL,
    author_id INT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add contraints --

-- User validation --
ALTER TABLE users
ADD CONSTRAINT email_validation_check
CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),

ADD CONSTRAINT email_trim_check
CHECK (email = TRIM(email)),

-- Restricts roles to only allowed application roles --
ADD CONSTRAINT allowed_roles_check
CHECK (role IN ('user', 'admin'));

-- Ensures a Google ID or a specific local account can only be linked once --
ALTER TABLE user_auth 
ADD CONSTRAINT unique_provider_key 
UNIQUE (provider, provider_key),

-- Author foreign key --
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;

-- Blogs & foreign key --
ALTER TABLE blogs
ADD CONSTRAINT fk_author
FOREIGN KEY (author_id)
REFERENCES users(id)
ON DELETE CASCADE,

ADD CONSTRAINT title_length_check 
CHECK (char_length(title) >= 5);
