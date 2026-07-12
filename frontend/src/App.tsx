import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { BrowseCoursesPage } from './pages/BrowseCoursesPage';
import { MyCoursesPage } from './pages/MyCoursesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ManageCoursesPage } from './pages/admin/ManageCoursesPage';
import { CourseFormPage } from './pages/admin/CourseFormPage';
import { ManageStudentsPage } from './pages/admin/ManageStudentsPage';
import { StudentDetailsPage } from './pages/admin/StudentDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppRoutes() {
  const { path } = useRouter();

  const isAuthPage = path === '/login' || path === '/register';
  const isNotFound = !getRoute(path);

  if (isAuthPage) {
    return path === '/login' ? <LoginPage /> : <RegisterPage />;
  }

  if (isNotFound) {
    return (
      <>
        <Navbar />
        <NotFoundPage />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {renderRoute(path)}
      </main>
      {!isNotFound && <Footer />}
      <ScrollToTop />
    </div>
  );
}

function getRoute(path: string): boolean {
  const routes = [
    '/',
    '/courses',
    '/about',
    '/login',
    '/register',
    '/dashboard',
    '/browse',
    '/my-courses',
    '/profile',
    '/admin',
    '/admin/courses',
    '/admin/courses/new',
    '/admin/students',
  ];
  if (routes.includes(path)) return true;
  if (path.startsWith('/admin/courses/') && path.endsWith('/edit')) return true;
  if (path.startsWith('/admin/students/')) return true;
  if (path.startsWith('/admin/courses/')) return true;
  return false;
}

function renderRoute(path: string) {
  if (path === '/') return <HomePage />;
  if (path === '/courses') return <CoursesPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/dashboard') return <StudentDashboard />;
  if (path === '/browse') return <BrowseCoursesPage />;
  if (path === '/my-courses') return <MyCoursesPage />;
  if (path === '/profile') return <ProfilePage />;
  if (path === '/admin') return <AdminDashboard />;
  if (path === '/admin/courses') return <ManageCoursesPage />;
  if (path === '/admin/courses/new') return <CourseFormPage mode="create" />;
  if (path.startsWith('/admin/courses/') && path.endsWith('/edit')) return <CourseFormPage mode="edit" />;
  if (path.startsWith('/admin/courses/')) return <CourseFormPage mode="edit" />;
  if (path === '/admin/students') return <ManageStudentsPage />;
  if (path.startsWith('/admin/students/')) {
    const id = path.split('/').pop() || '';
    return <StudentDetailsPage id={id} />;
  }
  return <NotFoundPage />;
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider>
            <AppRoutes />
          </RouterProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
