import { useEffect, useState } from 'react';
import { Users, BookOpen, GraduationCap, Clock, PlusCircle, UserCog, FileBarChart, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import { DashboardLayout } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { StatCardSkeleton } from '../components/ui/Skeleton';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Link, useRouter } from '../context/RouterContext';
import { courses, students, departments } from '../data/mockData';

export function AdminDashboard() {
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const totalEnrollments = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const totalWaitlisted = courses.reduce((sum, c) => sum + c.waitlistCount, 0);
  const activeStudents = students.filter((s) => s.status === 'Active').length;

  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: 'from-brand-500 to-brand-600', trend: `${activeStudents} active` },
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'from-accent-emerald to-teal-500', trend: 'across 8 depts' },
    { label: 'Enrollments', value: totalEnrollments, icon: GraduationCap, color: 'from-accent-orange to-amber-500', trend: '+12% this month' },
    { label: 'Waitlisted', value: totalWaitlisted, icon: Clock, color: 'from-accent-purple to-fuchsia-500', trend: 'across 6 courses' },
  ];

  const deptEnrollments = departments.map((dept) => {
    const deptCourses = courses.filter((c) => c.department === dept);
    const enrolled = deptCourses.reduce((sum, c) => sum + c.enrolled, 0);
    return { dept, enrolled, count: deptCourses.length };
  }).filter((d) => d.count > 0).sort((a, b) => b.enrolled - a.enrolled);

  const maxEnrollment = Math.max(...deptEnrollments.map((d) => d.enrolled));

  const quickActions = [
    { label: 'Add Course', desc: 'Create a new course offering', icon: PlusCircle, to: '/admin/courses/new', color: 'from-brand-500 to-brand-600' },
    { label: 'Manage Students', desc: 'View and manage student accounts', icon: UserCog, to: '/admin/students', color: 'from-accent-emerald to-teal-500' },
    { label: 'Manage Courses', desc: 'Edit or remove existing courses', icon: BookOpen, to: '/admin/courses', color: 'from-accent-orange to-amber-500' },
    { label: 'Reports', desc: 'Generate enrollment reports', icon: FileBarChart, to: '/admin', color: 'from-accent-purple to-fuchsia-500' },
  ];

  const recentActivity = [
    { message: 'Sneha Patel registered for Data Structures', time: '2h ago', type: 'register' },
    { message: 'New course "Machine Learning" created', time: '5h ago', type: 'create' },
    { message: 'Marcus Chen added to waitlist for Java Programming', time: '8h ago', type: 'waitlist' },
    { message: 'Course "World Literature" updated', time: '1d ago', type: 'update' },
    { message: 'Oliver Smith registered for Linear Algebra', time: '1d ago', type: 'register' },
  ];

  const activityColors: Record<string, string> = {
    register: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10',
    create: 'bg-brand-100 text-brand-600 dark:bg-brand-500/10',
    waitlist: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10',
    update: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10',
  };

  return (
    <DashboardLayout variant="admin">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Admin', to: '/admin' }, { label: 'Dashboard' }]} />

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Overview of university registration system.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            : stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="p-5">
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
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Enrollments by Department</h2>
              <FileBarChart className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-3">
              {deptEnrollments.map((d) => (
                <div key={d.dept}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{d.dept}</span>
                    <span className="text-slate-400">{d.enrolled} enrolled · {d.count} courses</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-700"
                      style={{ width: `${(d.enrolled / maxEnrollment) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Recent Activity</h2>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`w-7 h-7 rounded-lg ${activityColors[activity.type]} flex items-center justify-center shrink-0 mt-0.5`}>
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>
                  <div className="flex-1 min-w-0 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{activity.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.to} to={action.to}>
                  <Card hover className="p-5 h-full">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-3 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-1">{action.label}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{action.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      Open <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <Card className="p-5 mt-6">
          <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-4">Recently Active Students</h2>
          <div className="space-y-2">
            {students.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate(`/admin/students/${s.id}`)}>
                <Avatar name={s.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.department} · {s.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{s.enrolledCount}</p>
                  <p className="text-xs text-slate-400">courses</p>
                </div>
                <Badge variant={s.status === 'Active' ? 'active' : 'inactive'} dot>{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
