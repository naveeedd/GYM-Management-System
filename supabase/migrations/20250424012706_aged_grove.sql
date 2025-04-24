/*
  # Initial Schema Setup for Gym Management System

  1. New Tables
    - profiles (extends auth.users)
      - User profile information and role management
    - gym_plans
      - Available membership plans
    - user_plans
      - Active user subscriptions
    - attendance
      - Daily attendance tracking
    - products
      - Supplement/protein product catalog
    - orders
      - Order management for products
    - order_items
      - Individual items in orders
    - workouts
      - Workout plans and routines
    - diet_plans
      - Customized diet plans
    - expenses
      - Gym expense tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on user roles
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE plan_status AS ENUM ('active', 'expired', 'cancelled');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'cancelled', 'delivered');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role user_role DEFAULT 'user',
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gym Plans
CREATE TABLE gym_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  duration_months int NOT NULL,
  features jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Plans (Subscriptions)
CREATE TABLE user_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES gym_plans(id),
  status plan_status DEFAULT 'active',
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Attendance
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  check_in timestamptz NOT NULL,
  check_out timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products (Supplements/Protein)
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  stock_quantity int NOT NULL DEFAULT 0,
  category text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status order_status DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order Items
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity int NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Workouts
CREATE TABLE workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  exercises jsonb,
  schedule jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Diet Plans
CREATE TABLE diet_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  bmr decimal(10,2),
  daily_calories decimal(10,2),
  meal_plan jsonb,
  goals jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expenses
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  amount decimal(10,2) NOT NULL,
  category text,
  date date NOT NULL,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Gym Plans Policies
CREATE POLICY "Anyone can view gym plans"
  ON gym_plans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify gym plans"
  ON gym_plans FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- User Plans Policies
CREATE POLICY "Users can view their own plans"
  ON user_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all plans"
  ON user_plans FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Attendance Policies
CREATE POLICY "Users can view their own attendance"
  ON attendance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage attendance"
  ON attendance FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Products Policies
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify products"
  ON products FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Orders Policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Order Items Policies
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Workouts Policies
CREATE POLICY "Users can manage their own workouts"
  ON workouts FOR ALL
  USING (auth.uid() = user_id);

-- Diet Plans Policies
CREATE POLICY "Users can manage their own diet plans"
  ON diet_plans FOR ALL
  USING (auth.uid() = user_id);

-- Expenses Policies
CREATE POLICY "Only admins can manage expenses"
  ON expenses FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Insert sample gym plans
INSERT INTO gym_plans (name, description, price, duration_months, features) VALUES
  ('Basic', 'Perfect for beginners', 29.99, 1, '{"gym_access": true, "locker": true, "trainer": false}'),
  ('Premium', 'Most popular plan', 49.99, 1, '{"gym_access": true, "locker": true, "trainer": true, "classes": true}'),
  ('Elite', 'Ultimate fitness experience', 79.99, 1, '{"gym_access": true, "locker": true, "trainer": true, "classes": true, "nutrition": true}');

-- Insert sample products
INSERT INTO products (name, description, price, stock_quantity, category, image_url) VALUES
  ('Whey Protein Isolate', 'High-quality protein powder', 49.99, 100, 'protein', 'https://images.pexels.com/photos/4397838/pexels-photo-4397838.jpeg'),
  ('Pre-Workout Formula', 'Energy boost for intense workouts', 39.99, 50, 'supplement', 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg'),
  ('BCAA Complex', 'Amino acid supplement', 29.99, 75, 'supplement', 'https://images.pexels.com/photos/3838722/pexels-photo-3838722.jpeg');