CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    hero_description TEXT,
    about_description TEXT,
    capabilities_description TEXT,
    about_title VARCHAR(500),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    resume_url VARCHAR(500),
    picture_url VARCHAR(500),
    portfolio_name VARCHAR(255) UNIQUE is_active BOOLEAN DEFAULT true
);
-- Enable RLS for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for users" ON users FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable select for users" ON users FOR
SELECT USING (true);
CREATE POLICY "Enable update for users" ON users FOR
UPDATE USING (true);
CREATE POLICY "Enable delete for users" ON users FOR DELETE USING (true);
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(255),
    period VARCHAR(100),
    description TEXT,
    company VARCHAR(255)
);
-- Enable RLS for experiences
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for experiences" ON experiences FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable select for experiences" ON experiences FOR
SELECT USING (true);
CREATE POLICY "Enable update for experiences" ON experiences FOR
UPDATE USING (true);
CREATE POLICY "Enable delete for experiences" ON experiences FOR DELETE USING (true);
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    type VARCHAR(10),
    constraint check_type CHECK (type IN ('primary', 'secondary')),
    icon VARCHAR(255)
);
-- Enable RLS for skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for skills" ON skills FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable select for skills" ON skills FOR
SELECT USING (true);
CREATE POLICY "Enable update for skills" ON skills FOR
UPDATE USING (true);
CREATE POLICY "Enable delete for skills" ON skills FOR DELETE USING (true);
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    client VARCHAR(255),
    role VARCHAR(255),
    year INTEGER,
    state VARCHAR(100),
    sort_order INTEGER,
    description TEXT,
    github_url VARCHAR(500),
    technologies TEXT [],
    images TEXT []
);
-- Enable RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for projects" ON projects FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable select for projects" ON projects FOR
SELECT USING (true);
CREATE POLICY "Enable update for projects" ON projects FOR
UPDATE USING (true);
CREATE POLICY "Enable delete for projects" ON projects FOR DELETE USING (true);
CREATE TABLE IF NOT EXISTS secret_key (
    id SERIAL PRIMARY KEY,
    secret VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable RLS for secret_key
ALTER TABLE secret_key ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for secret_key" ON secret_key FOR
INSERT WITH CHECK (true);
CREATE POLICY "Enable select for secret_key" ON secret_key FOR
SELECT USING (true);
CREATE POLICY "Enable update for secret_key" ON secret_key FOR
UPDATE USING (true);
CREATE POLICY "Enable delete for secret_key" ON secret_key FOR DELETE USING (true);