-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create message_analysis table for storing scan history
CREATE TABLE public.message_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  original_text text NOT NULL,
  toxicity_score integer NOT NULL,
  categories jsonb NOT NULL,
  highlighted_words jsonb,
  safer_version text,
  advice text,
  model_used text DEFAULT 'gemini',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.message_analysis ENABLE ROW LEVEL SECURITY;

-- Create safety_tips table
CREATE TABLE public.safety_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.safety_tips ENABLE ROW LEVEL SECURITY;

-- Create user settings table
CREATE TABLE public.user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  theme text DEFAULT 'light',
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  INSERT INTO public.user_settings (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for user_settings updated_at
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for message_analysis
CREATE POLICY "Users can view their own analysis"
  ON public.message_analysis FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analysis"
  ON public.message_analysis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analysis"
  ON public.message_analysis FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for safety_tips (public read)
CREATE POLICY "Anyone can view safety tips"
  ON public.safety_tips FOR SELECT
  USING (true);

-- RLS Policies for user_settings
CREATE POLICY "Users can view their own settings"
  ON public.user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON public.user_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert some default safety tips
INSERT INTO public.safety_tips (title, content, category) VALUES
('Report Harassment Immediately', 'If you experience online harassment, document the evidence (screenshots, messages) and report it to the platform immediately. Most social media platforms have built-in reporting tools.', 'harassment'),
('Protect Your Personal Information', 'Never share your home address, phone number, or other sensitive information publicly online. Review your privacy settings regularly on all social media platforms.', 'privacy'),
('Recognize Cyberbullying', 'Cyberbullying includes repeated hostile messages, threats, spreading rumors, or sharing embarrassing information. Block the person and report them to the platform.', 'bullying'),
('Dealing with Deepfakes', 'If you discover a deepfake of yourself, report it to the platform immediately. Contact local authorities if it''s being used maliciously. Document everything.', 'deepfake'),
('African Help Centers', 'Organizations like Digital Rights East Africa, Pollicy, and local women''s rights groups offer support for digital harassment. Reach out for help and guidance.', 'support'),
('Social Media Safety Tips', 'Use strong, unique passwords. Enable two-factor authentication. Be careful about who you accept as friends or followers. Review your privacy settings monthly.', 'social_media'),
('When to Contact Authorities', 'Contact law enforcement if you receive credible threats, experience stalking, or if someone shares intimate images without consent. Keep all evidence.', 'legal'),
('Online Safety for Activists', 'Use encrypted messaging apps. Be cautious about location sharing. Use VPNs when necessary. Keep separate personal and activist accounts.', 'activism');

-- Insert Swahili translations
INSERT INTO public.safety_tips (title, content, category, language) VALUES
('Ripoti Udhalimu Mara Moja', 'Ukipata udhalimu mtandaoni, andika ushahidi (picha za skrini, ujumbe) na uripoti kwa jukwaa mara moja. Majukwaa mengi ya mitandao ya kijamii yana zana za kuripoti zilizojengwa.', 'harassment', 'sw'),
('Linda Taarifa Zako Binafsi', 'Usitoe anwani yako ya nyumbani, nambari ya simu, au taarifa nyingine nyeti hadharani mtandaoni. Kagua mipangilio yako ya faragha mara kwa mara kwenye majukwaa yote ya mitandao ya kijamii.', 'privacy', 'sw'),
('Tambua Uonevu wa Mtandaoni', 'Uonevu wa mtandaoni ni pamoja na ujumbe wa uadui unarudiwa, vitisho, kusambaza uvumi, au kushiriki taarifa za aibu. Zuia mtu huyo na mripoti kwa jukwaa.', 'bullying', 'sw'),
('Kushughulikia Deepfakes', 'Ukigundua deepfake yako, iripoti kwa jukwaa mara moja. Wasiliana na mamlaka za ndani ikiwa inatumika vibaya. Andika kila kitu.', 'deepfake', 'sw');