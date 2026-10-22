export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category: string;
  tags: string[];
  cover_image_url: string;
  gallery_images?: string[];
  technologies: string[];
  project_url?: string;
  source_code_url?: string;
  video_url?: string;
  is_featured: boolean;
  status: 'draft' | 'published';
  start_date?: string;
  completion_date?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}

export interface AdminProfile {
  id: string;
  user_id: string;
  role: 'admin' | 'owner';
  created_at: string;
}
