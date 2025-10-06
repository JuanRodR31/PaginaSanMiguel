/*
  # Add Team Members Table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text) - Team member's full name
      - `role` (text) - Position/role in the foundation
      - `photo_url` (text) - URL to team member's photo
      - `bio` (text) - Short biography
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on team_members table
    - Add policy for public read access (team data is public)
    - Restrict write access to authenticated users only
*/

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  photo_url text NOT NULL,
  bio text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON team_members FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(order_index ASC);