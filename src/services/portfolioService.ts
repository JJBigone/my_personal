import { supabase } from '../utils/supabase';
import type { Project, ContactMessage } from '../types/portfolio';
import { INITIAL_PROJECTS } from '../data/initialProjects';

const LOCAL_STORAGE_PROJECTS_KEY = 'portfolio_custom_projects';
const LOCAL_STORAGE_MESSAGES_KEY = 'portfolio_contact_messages';

function getLocalProjects(): Project[] {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
    if (stored) {
      const parsed: Project[] = JSON.parse(stored);
      // Ensure existing initial projects get the updated cover, gallery_images, and URLs
      return parsed.map((p) => {
        const initial = INITIAL_PROJECTS.find((init) => init.id === p.id);
        if (initial) {
          return {
            ...p,
            cover_image_url: initial.cover_image_url,
            gallery_images: initial.gallery_images,
            project_url: initial.project_url,
            source_code_url: initial.source_code_url,
          };
        }
        return p;
      });
    }
  } catch (e) {
    console.error('Failed to parse local projects', e);
  }
  return INITIAL_PROJECTS;
}

function saveLocalProjects(projects: Project[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save local projects', e);
  }
}

export const portfolioService = {
  // Public: Get published projects
  async getPublishedProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to local storage or initial projects
        return getLocalProjects().filter(p => p.status === 'published');
      }
      return data as Project[];
    } catch {
      return getLocalProjects().filter(p => p.status === 'published');
    }
  },

  // Public: Get published project by slug
  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        // Only return if published or admin
        return data as Project;
      }
      const local = getLocalProjects().find(p => p.slug === slug);
      return local || null;
    } catch {
      const local = getLocalProjects().find(p => p.slug === slug);
      return local || null;
    }
  },

  // Admin: Get all projects (including drafts)
  async getAllProjectsAdmin(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return getLocalProjects();
      }
      return data as Project[];
    } catch {
      return getLocalProjects();
    }
  },

  // Admin: Save or update project
  async saveProject(project: Partial<Project>): Promise<Project> {
    const isNew = !project.id;
    const now = new Date().toISOString();
    const projectData = {
      ...project,
      updated_at: now,
      ...(isNew ? { created_at: now, id: crypto.randomUUID() } : {})
    };

    try {
      if (isNew) {
        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select()
          .single();

        if (!error && data) {
          return data as Project;
        }
      } else {
        const { data, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id!)
          .select()
          .single();

        if (!error && data) {
          return data as Project;
        }
      }
    } catch (e) {
      console.warn('Supabase write fallback to local storage', e);
    }

    // Local fallback update
    const current = getLocalProjects();
    let updatedList: Project[];
    if (isNew) {
      updatedList = [projectData as Project, ...current];
    } else {
      updatedList = current.map(p => (p.id === project.id ? ({ ...p, ...projectData } as Project) : p));
    }
    saveLocalProjects(updatedList);
    return projectData as Project;
  },

  // Admin: Delete project
  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (!error) {
        // also remove local if present
        const current = getLocalProjects();
        saveLocalProjects(current.filter(p => p.id !== id));
        return true;
      }
    } catch (e) {
      console.warn('Supabase delete fallback to local storage', e);
    }

    const current = getLocalProjects();
    saveLocalProjects(current.filter(p => p.id !== id));
    return true;
  },

  // Public: Submit contact message
  async submitContactMessage(message: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): Promise<boolean> {
    const now = new Date().toISOString();
    const payload = {
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: 'new',
      created_at: now
    };

    try {
      const { error } = await supabase.from('contact_messages').insert([payload]);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase message insert error, storing locally', e);
    }

    // Fallback store in localStorage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({ ...payload, id: crypto.randomUUID() });
      localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  },

  // Admin: Get contact messages
  async getContactMessagesAdmin(): Promise<ContactMessage[]> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as ContactMessage[];
      }
    } catch (e) {
      console.warn('Supabase fetch messages error', e);
    }

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // Admin: Upload project image
  async uploadImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file);

      if (!uploadError) {
        const { data } = supabase.storage
          .from('portfolio-media')
          .getPublicUrl(filePath);
        return data.publicUrl;
      }
    } catch (e) {
      console.warn('Storage upload error, using local object URL', e);
    }

    // Fallback to Data URL for instant preview and offline development
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
};
