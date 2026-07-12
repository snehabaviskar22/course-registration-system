import { useState, useMemo, useEffect } from 'react';
import { Eye, Pencil, Trash2, Plus, Search, Filter } from 'lucide-react';
import * as Icons from 'lucide-react';

type IconType = React.ComponentType<{ className?: string }>;
const iconMap = Icons as unknown as Record<string, IconType>;
import { courses, departments, getCourseStatus, getSeatsLeft, type Course } from '../../data/mockData';
import { DashboardLayout } from '../../components/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SearchBar } from '../../components/ui/SearchBar';
import { Select } from '../../components/ui/Input';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ConfirmDialog } from '../../components/ui/Modal';
import { TableSkeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';
import { useRouter } from '../../context/RouterContext';

export function ManageCoursesPage() {
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setCourseList(courses); setLoading(false); }, 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return courseList.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
      const matchDept = dept === 'all' || c.department === dept;
      return matchSearch && matchDept;
    });
  }, [courseList, search, dept]);

  const handleDelete = () => {
    if (!deleteTarget) return;
    setCourseList((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    showToast(`${deleteTarget.name} has been deleted`, 'info');
    setDeleteTarget(null);
  };

  return (
    <DashboardLayout variant="admin">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Admin', to: '/admin' }, { label: 'Manage Courses' }]} />

        <div className="mt-4 mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">Manage Courses</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">View, edit, and manage all course offerings.</p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => navigate('/admin/courses/new')}>
            Add Course
          </Button>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." suggestions={courses.map((c) => c.name)} />
            </div>
            <Select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              options={[{ value: 'all', label: 'All Departments' }, ...departments.map((d) => ({ value: d, label: d }))]}
              icon={<Filter className="w-4 h-4" />}
            />
          </div>
        </Card>

        {loading ? (
          <TableSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <Card>
            <EmptyState icon={<Search className="w-8 h-8" />} title="No courses found" description="Try adjusting your search or filters." />
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Course</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Department</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Semester</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Capacity</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Status</th>
                    <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((course) => {
                    const Icon = iconMap[course.icon] || Icons.BookOpen;
                    const seatsLeft = getSeatsLeft(course);
                    return (
                      <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center text-white shrink-0`}>
                              <Icon className="w-4.5 h-4.5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{course.name}</p>
                              <p className="text-xs text-slate-400">{course.code} · {course.instructor}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="text-sm text-slate-600 dark:text-slate-300">{course.department}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <span className="text-sm text-slate-600 dark:text-slate-300">{course.semester}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{course.enrolled}/{course.capacity}</p>
                            <p className="text-xs text-slate-400">{seatsLeft} available</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => navigate(`/admin/courses/${course.id}`)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500/10 transition-all" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => navigate(`/admin/courses/${course.id}/edit`)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 transition-all" title="Edit">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteTarget(course)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 transition-all" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this course?"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This will remove all enrollment and waitlist data. This action cannot be undone.`}
        confirmLabel="Delete Course"
        variant="danger"
      />

      <button
        onClick={() => navigate('/admin/courses/new')}
        className="lg:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full bg-brand-600 text-white shadow-float flex items-center justify-center hover:bg-brand-700 transition-all btn-press z-30"
      >
        <Plus className="w-6 h-6" />
      </button>
    </DashboardLayout>
  );
}
