-- 1. Wipe old data safely in the correct order and reset ID counters
TRUNCATE TABLE user_auth, blogs, users RESTART IDENTITY CASCADE;

-- 2. Insert Users (Turner gets ID 1, Bob gets ID 2 automatically)
INSERT INTO users (name, email, role, created_at)
VALUES
    ('Turner Vickery', 'turner.vickery@gmail.com', 'admin', CURRENT_TIMESTAMP),
    ('Bob Jones', 'bob@example.com', 'user', CURRENT_TIMESTAMP);

-- 3. Insert Auth credentials linked to those specific user IDs
INSERT INTO user_auth (user_id, provider, provider_key)
VALUES
    (1, 'local', '$2a$10$ZRWfTxPFE5kvlVBY6BrQLe6VdrKxtGpCI6EJDxfrUAPBlA6Ox2eba'),
    (2, 'local', '$2a$10$qS40Ft/Pxrphk0boVOkdD.KVOCB65rir1aCMm0K36V./GCxvJsSm.');

-- 4. Insert Blogs linked to those specific author IDs
-- is_published is explicitly TRUE here so seed data is immediately visible in the app.
-- Real user drafts will correctly default to FALSE until approved.
INSERT INTO blogs (title, description, category, image_url, content, author_id, slug, is_published, created_at)
VALUES
    (
        'My First Post', 
        'An introductory post about my web development journey.',
        'Architecture',
        'https://picsum.photos/800/400?random=1',
        '[
            {"data": {"text": "Welcome to my brand new blog! This content uses the industry standard JSONB format structure natively supported by Postgres."}, "type": "paragraph" }, 
            {"data": {"text": "Why Blocks?", "level": 2}, "type": "subheading"},
            {"data": {"text": "Separating our styling layout from our raw text structure makes managing production data incredibly easy over time."},"type": "paragraph"}
        ]'::jsonb, 
        1, 
        'my-first-post',
        TRUE,
        CURRENT_TIMESTAMP
    ),
    (
        'Learning postgres', 
        'A deep dive into setting up relational databases with Express.',
        'DevEx',
        'https://picsum.photos/800/400?random=2',
        '[
            {"type": "paragraph", "data": {"text": "Express and PostgreSQL are an absolute powerhouse combination for handling enterprise web application servers."}},
            {"type": "unorderedList", "data": {"items": ["Fast performance", "Native JSONB support", "Robust relational constraints"]}}
        ]'::jsonb, 
        2, 
        'learning-postgres',
        TRUE,
        CURRENT_TIMESTAMP
    );

-- 5. Inform Postgres to sync internal counters so next app registrations don't overlap IDs
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('user_auth_id_seq', (SELECT MAX(id) FROM user_auth));
SELECT setval('blogs_id_seq', (SELECT MAX(id) FROM blogs));