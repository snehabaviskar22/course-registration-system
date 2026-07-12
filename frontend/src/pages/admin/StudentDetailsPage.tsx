import { useEffect, useState } from 'react';
import { Mail, Hash, Building2, Calendar, BookOpen, Clock, Activity, ArrowLeft, CheckCircle2, UserPlus } from 'lucide-react';
import { students, myEnrollments } from '../../data/mockData';
import { DashboardLayout } from '../../components/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { EmptyState } from '../../components/ui/EmptyState';
import { useRouter } from '../../context/RouterContext';

export function StudentDetailsPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const student = students.find((s) => s.id === id) || students[0];
  const enrolled = myEnrollments.filter((c) => c.status === 'ENROLLED');
  const waitlisted = myEnrollments.filter((c) => c.status === 'WAITLISTED');

  const timeline = [
    { message: `Registered for ${enrolled[0]?.name || 'Data Structures'}`, time: '2 hours ago', type: 'register' },
    { message: `Added to waitlist for ${waitlisted[0]?.name || 'Java Programming'}`, time: '5 hours ago', type: 'waitlist' },
    { message: `Registered for ${enrolled[1]?.name || 'Linear Algebra'}`, time: '2 days ago', type: 'register' },
    { message: 'Account created', time: new Date(student.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), type: 'create' },
  ];

  const timelineColors: Record<string, string> = {
    register: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10',
    waitlist: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10',
    create: 'bg-brand-100 text-brand-600 dark:bg-brand-500/10',
    drop: 'bg-red-100 text-red-600 dark:bg-red-500/10',
  };
  const timelineIcons: Record<string, typeof Activity> = {
    register: CheckCircle2,
    waitlist: Clock,
    create: UserPlus,
    drop: Activity,
  };

  if (loading) {
    return (
      <DashboardLayout variant="admin">
        <div className="space-y-4">
          <div className="h-8 w-48 skeleton rounded-lg" />
          <div className="h-40 skeleton rounded-2xl" />
          <div className="h-64 skeleton rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout variant="admin">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Admin', to: '/admin' }, { label: 'Manage Students', to: '/admin/students' }, { label: student.name }]} />

        <div className="mt-4 mb-6 flex items-center gap-3">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin/students')}>
            Back
          </Button>
        </div>

        <Card className="p-6 mb-5">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <Avatar name={student.name} size="xl" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold font-display text-slate-800 dark:text-white">{student.name}</h1>
                <Badge variant={student.status === 'Active' ? 'active' : 'inactive'} dot>{student.status}</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-4">{student.email}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <InfoItem icon={Hash} label="Student ID" value={student.studentId} />
                <InfoItem icon={Building2} label="Department" value={student.department} />
                <InfoItem icon={Calendar} label="Year" value={student.year} />
                <InfoItem icon={Mail} label="Joined" value={new Date(student.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Registered Courses</h2>
                <span className="ml-auto text-sm text-slate-400">{enrolled.length} courses</span>
              </div>
              {enrolled.length === 0 ? (
                <EmptyState title="No enrolled courses" />
              ) : (
                <div className="space-y-2">
                  {enrolled.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {c.code.split('-')[0][0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.code} · {c.credits} credits</p>
                      </div>
                      <Badge variant="enrolled">Enrolled</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-amber-500" />
                <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Waitlisted Courses</h2>
                <span className="ml-auto text-sm text-slate-400">{waitlisted.length} courses</span>
              </div>
              {waitlisted.length === 0 ? (
                <EmptyState title="No waitlisted courses" />
              ) : (
                <div className="space-y-2">
                  {waitlisted.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {c.code.split('-')[0][0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.code} · Position {c.waitlistPosition} of {c.waitlistTotal}</p>
                      </div>
                      <Badge variant="waitlisted">Waitlisted</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-brand-500" />
              <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Activity Timeline</h2>
            </div>
            <div className="space-y-1">
              {timeline.map((item, i) => {
                const Icon = timelineIcons[item.type] || Activity;
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-lg ${timelineColors[item.type]} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700 my-1" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.message}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  );
}
