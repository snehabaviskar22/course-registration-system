import { type ReactNode } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  User,
  LogOut,
  Settings,
  Users,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './ui/Avatar';

interface SidebarProps {
  variant: 'student' | 'admin';
}

export function Sidebar({ variant }: SidebarProps) {
  const { path, navigate } = useRouter();
  const { user, logout } = useAuth();

  const studentLinks = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Courses', to: '/browse', icon: BookOpen },
    { label: 'My Courses', to: '/my-courses', icon: GraduationCap },
    { label: 'Profile', to: '/profile', icon: User },
  ];

  const adminLinks = [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
    { label: 'Manage Courses', to: '/admin/courses', icon: BookOpen },
    { label: 'Add Course', to: '/admin/courses/new', icon: PlusCircle },
    { label: 'Manage Students', to: '/admin/students', icon: Users },
  ];

  const links = variant === 'admin' ? adminLinks : studentLinks;

  const isActive = (to: string) => (to === '/admin' ? path === '/admin' : path.startsWith(to) && to !== '/admin');

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-20 h-[calc(100vh-6rem)] py-4 pr-2">
      <div className="flex-1 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                active
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'}`} />
              {link.label}
              {active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
        {variant === 'admin' && (
          <Link to="/admin/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Settings className="w-4.5 h-4.5 text-slate-400" />
            Settings
          </Link>
        )}
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4.5 h-4.5" />
          Logout
        </button>
        <div className="flex items-center gap-3 px-3.5 py-3 mt-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <Avatar name={user?.name || 'User'} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{variant === 'admin' ? 'Administrator' : 'Student'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileTabBar({ variant }: SidebarProps) {
  const { path, navigate } = useRouter();

  const studentLinks = [
    { label: 'Home', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse', to: '/browse', icon: BookOpen },
    { label: 'Courses', to: '/my-courses', icon: GraduationCap },
    { label: 'Profile', to: '/profile', icon: User },
  ];

  const adminLinks = [
    { label: 'Home', to: '/admin', icon: LayoutDashboard },
    { label: 'Courses', to: '/admin/courses', icon: BookOpen },
    { label: 'Add', to: '/admin/courses/new', icon: PlusCircle },
    { label: 'Students', to: '/admin/students', icon: Users },
  ];

  const links = variant === 'admin' ? adminLinks : studentLinks;
  const isActive = (to: string) => (to === '/admin' ? path === '/admin' : path.startsWith(to) && to !== '/admin');

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-slate-200/60 dark:border-slate-800/60 px-2 py-1.5">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.to);
          return (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all ${
                active ? 'text-brand-600' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{link.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function DashboardLayout({ children, variant }: { children: ReactNode; variant: 'student' | 'admin' }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 lg:pb-8">
      <div className="flex gap-6">
        <Sidebar variant={variant} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      <MobileTabBar variant={variant} />
    </div>
  );
}
