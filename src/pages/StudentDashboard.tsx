import { useEffect, useState } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  CalendarClock,
  ArrowRight,
  TrendingUp,
  UserPlus,
  LogOut,
  Activity,
  CheckCircle2,
  AlertCircle,
  LogIn,
} from 'lucide-react';
import { DashboardLayout } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { StatCardSkeleton } from '../components/ui/Skeleton';
import { useAuth } from '../context/AuthContext';
import { Link, useRouter } from '../context/RouterContext';
import { studentApi } from '../data/api';
import type { DashboardData, EnrolledCourse } from '../data/mockData';

export function StudentDashboard() {
  const { user, logout } = useAuth();
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    Promise.all([studentApi.getDashboard(user.id), studentApi.getMyCourses(user.id)])
      .then(([d, c]) => {
        setDashboard(d);
        setCourses(c);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return null;

  const enrolledCount = dashboard?.enrolledCount ?? 0;
  const waitlistCount = dashboard?.waitlistCount ?? 0;
  const totalCredits = dashboard?.registeredCredits ?? 0;
  const upcomingDeadlines = courses
    .map((c) => ({ name: c.name, deadline: c.deadline }))
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const stats = [
    { label: 'Courses Enrolled', value: enrolledCount, icon: BookOpen, color: 'from-brand-500 to-brand-600', trend: 'this semester' },
    { label: 'Waitlisted Courses', value: waitlistCount, icon: Clock, color: 'from-accent-orange to-amber-500', trend: `${waitlistCount} active` },
    { label: 'Available Credits', value: totalCredits, icon: Award, color: 'from-accent-emerald to-teal-500', trend: 'of 18 max' },
    { label: 'Upcoming Deadlines', value: upcomingDeadlines.length, icon: CalendarClock, color: 'from-accent-purple to-fuchsia-500', trend: 'next 30 days' },
  ];

  const navCards = [
    { label: 'Browse Courses', desc: 'Find and register for new courses', icon: BookOpen, to: '/browse', color: 'from-brand-500 to-brand-600' },
    { label: 'My Courses', desc: 'View enrolled and waitlisted courses', icon: CheckCircle2, to: '/my-courses', color: 'from-accent-emerald to-teal-500' },
    { label: 'Profile', desc: 'Update your personal information', icon: UserPlus, to: '/profile', color: 'from-accent-purple to-fuchsia-500' },
  ];

  const recentActivities = courses.slice(0, 5).map((c, i) => ({
    id: String(i),
    type: c.status === 'ENROLLED' ? 'register' as const : 'waitlist' as const,
    message: `${c.status === 'ENROLLED' ? 'Registered for' : 'Added to waitlist for'} ${c.name}`,
    timestamp: c.enrollmentDate ? new Date(c.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
  }));

  const activityIcons: Record<string, typeof Activity> = {
    register: CheckCircle2,
    waitlist: Clock,
    drop: AlertCircle,
    login: LogIn,
  };
  const activityColors: Record<string, string> = {
    register: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10',
    waitlist: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10',
    drop: 'bg-red-100 text-red-600 dark:bg-red-500/10',
    login: 'bg-brand-100 text-brand-600 dark:bg-brand-500/10',
  };

  return (
    <DashboardLayout variant="student">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Student', to: '/dashboard' }, { label: 'Dashboard' }]} />

        <div className="mt-4 mb-6">
          <div className="flex items-center gap-4">
            <Avatar name={dashboard?.profile?.name || user.name} size="lg" />
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">
                Welcome, {(dashboard?.profile?.name || user.name).split(' ')[0]}!
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {dashboard?.profile?.department || ''} · {dashboard?.profile?.year || ''} · {dashboard?.profile?.studentId || ''}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            : stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="p-5 animate-fade-in" >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-3xl font-bold font-display text-slate-800 dark:text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{stat.trend}</p>
                  </Card>
                );
              })}
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Recent Activity</h2>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-3">
              {recentActivities.length === 0 ? (
                <p className="text-sm text-slate-400 py-8 text-center">No recent activity yet. Register for courses to get started.</p>
              ) : recentActivities.map((activity) => {
                const Icon = activityIcons[activity.type] || Activity;
                return (
                  <div key={activity.id} className="flex items-start gap-3 group">
                    <div className={`w-8 h-8 rounded-lg ${activityColors[activity.type]} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 pb-3 border-b border-slate-100 dark:border-slate-800 group-last:border-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{activity.message}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
              {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center">No upcoming deadlines.</p>
            ) : upcomingDeadlines.map((d) => {
                const days = Math.ceil((new Date(d.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={d.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center ${days < 7 ? 'bg-red-100 text-red-600 dark:bg-red-500/10' : 'bg-brand-100 text-brand-600 dark:bg-brand-500/10'}`}>
                      <span className="text-sm font-bold leading-none">{days}</span>
                      <span className="text-[8px] font-semibold">days</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{d.name}</p>
                      <p className="text-xs text-slate-400">{new Date(d.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.to} to={card.to}>
                <Card hover className="p-5 h-full">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-3 shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-1">{card.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Go <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Need a break?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">You can log out anytime. Your data is saved.</p>
            </div>
            <Button variant="outline" icon={<LogOut className="w-4 h-4" />} onClick={() => { logout(); navigate('/'); }}>
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
