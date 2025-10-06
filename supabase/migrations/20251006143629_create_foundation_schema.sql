/*
  # Foundation Soccer School Schema

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `name` (text) - Player's full name
      - `position` (text) - Playing position
      - `age` (integer) - Player's age
      - `photo_url` (text) - URL to player's photo
      - `bio` (text) - Short biography
      - `achievements` (text) - Player achievements
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text) - Event title
      - `description` (text) - Event description
      - `event_date` (date) - Date of the event
      - `location` (text) - Event location
      - `photos` (jsonb) - Array of photo URLs
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `videos`
      - `id` (uuid, primary key)
      - `title` (text) - Video title
      - `description` (text) - Video description
      - `video_url` (text) - URL to video
      - `thumbnail_url` (text) - URL to video thumbnail
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `donations`
      - `id` (uuid, primary key)
      - `donor_name` (text) - Name of donor (optional)
      - `amount` (numeric) - Donation amount
      - `message` (text) - Optional message from donor
      - `created_at` (timestamptz) - Donation timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (foundation data is public)
    - Restrict write access to authenticated users only
*/

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  age integer NOT NULL,
  photo_url text NOT NULL,
  bio text DEFAULT '',
  achievements text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view players"
  ON players FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can insert players"
  ON players FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update players"
  ON players FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete players"
  ON players FOR DELETE
  TO authenticated
  USING (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date date NOT NULL,
  location text NOT NULL,
  photos jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  video_url text NOT NULL,
  thumbnail_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view videos"
  ON videos FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text DEFAULT '',
  amount numeric NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view donations"
  ON donations FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert donations"
  ON donations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);