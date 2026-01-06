CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    hero_description TEXT,
    about_description TEXT,
    capabilities_description TEXT,
    about_title VARCHAR(500),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    resume_url VARCHAR(500),
    picture_url VARCHAR(500)
);
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(255),
    period VARCHAR(100),
    description TEXT
);
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    type VARCHAR(10),
    constraint check_type CHECK (type IN ('primary', 'secondary')),
    icon VARCHAR(255)
);
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
CREATE TABLE IF NOT EXISTS secret_key (
    id SERIAL PRIMARY KEY,
    secret VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);