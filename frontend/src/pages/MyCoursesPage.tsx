import { useState, useEffect } from 'react';
import { BookOpen, Clock, Calendar, Trash2, Eye } from 'lucide-react';
import * as Icons from 'lucide-react';

type IconType = React.ComponentType<{ className?: string }>;
const iconMap = Icons as unknown as Record<string, IconType>;
import { myEnrollments, type EnrolledCourse } from '../data/mockData';
import { DashboardLayout } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { ConfirmDialog } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../context/ToastContext';

export function MyCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'all' | 'enrolled' | 'waitlisted'>('all');
  const [dropTarget, setDropTarget] = useState<EnrolledCourse | null>(null);
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => {
      setEnrollments(myEnrollments);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = enrollments.filter((c) => {
    if (tab === 'enrolled') return c.status === 'ENROLLED';
    if (tab === 'waitlisted') return c.status === 'WAITLISTED';
    return true;
  });

  const handleDrop = () => {
    if (!dropTarget) return;
    setEnrollments((prev) => prev.filter((c) => c.id !== dropTarget.id));
    showToast(`Dropped ${dropTarget.name}`, 'info');
    setDropTarget(null);
  };

  const tabs = [
    { key: 'all' as const, label: 'All', count: enrollments.length },
    { key: 'enrolled' as const, label: 'Enrolled', count: enrollments.filter((c) => c.status === 'ENROLLED').length },
    { key: 'waitlisted' as const, label: 'Waitlisted', count: enrollments.filter((c) => c.status === 'WAITLISTED').length },
  ];

  return (
    <DashboardLayout variant="student">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'My Courses' }]} />

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">My Courses</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your enrolled and waitlisted courses.</p>
        </div>

        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              {t.label} <span className="ml-1 text-xs opacity-60">({t.count})</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 skeleton rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <EmptyState
              icon={<BookOpen className="w-8 h-8" />}
              title="No courses here"
              description="You don't have any courses in this category yet. Browse courses to get started."
            />
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((course) => {
              const Icon = iconMap[course.icon] || Icons.BookOpen;
              return (
                <Card key={course.id} className="p-5 animate-fade-in" >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-brand-600">{course.code}</span>
                        {course.status === 'ENROLLED' ? (
                          <Badge variant="enrolled" dot>Enrolled</Badge>
                        ) : (
                          <Badge variant="waitlisted" dot>Waitlisted</Badge>
                        )}
                      </div>
                      <h3 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 truncate">{course.name}</h3>
                      <p className="text-sm text-slate-400">{course.instructor}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Icons.Folder className="w-4 h-4 text-slate-400" />
                      {course.department}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Icons.Award className="w-4 h-4 text-slate-400" />
                      {course.credits} credits
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(course.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    {course.status === 'WAITLISTED' && (
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                        <Clock className="w-4 h-4" />
                        Position {course.waitlistPosition} of {course.waitlistTotal}
                      </div>
                    )}
                  </div>

                  {course.status === 'WAITLISTED' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-400">Waitlist progress</span>
                        <span className="font-semibold text-amber-600">{course.waitlistPosition} ahead of you</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${((course.waitlistTotal! - course.waitlistPosition!) / course.waitlistTotal!) * 100}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />} className="flex-1">
                      View Details
                    </Button>
                    <Button variant="danger" size="sm" icon={<Trash2 className="w-4 h-4" />} onClick={() => setDropTarget(course)}>
                      Drop
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!dropTarget}
        onClose={() => setDropTarget(null)}
        onConfirm={handleDrop}
        title="Drop this course?"
        message={`Are you sure you want to drop ${dropTarget?.name}? This action cannot be undone, and you may lose your waitlist position.`}
        confirmLabel="Yes, Drop Course"
        variant="danger"
      />
    </DashboardLayout>
  );
}
