import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';

import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardPage } from './admin/DashboardPage';
import { ProjectListPage } from './admin/ProjectListPage';
import { ProjectEditorPage } from './admin/ProjectEditorPage';
import { MessagesPage } from './admin/MessagesPage';
import { SettingsPage } from './admin/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Liquid Glass Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectListPage />} />
            <Route path="projects/new" element={<ProjectEditorPage />} />
            <Route path="projects/:id/edit" element={<ProjectEditorPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
