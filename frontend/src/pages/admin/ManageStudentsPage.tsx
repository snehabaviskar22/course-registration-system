import { useState, useMemo, useEffect } from 'react';
import { Eye, UserX, Search, Filter } from 'lucide-react';
import { students, departments, type Student } from '../../data/mockData';
import { DashboardLayout } from '../../components/Sidebar';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { SearchBar } from '../../components/ui/SearchBar';
import { Select } from '../../components/ui/Input';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ConfirmDialog } from '../../components/ui/Modal';
import { TableSkeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';
import { useRouter } from '../../context/RouterContext';

export function ManageStudentsPage() {
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [deactivateTarget, setDeactivateTarget] = useState<Student | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setStudentList(students); setLoading(false); }, 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return studentList.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.studentId.toLowerCase().includes(search.toLowerCase());
      const matchDept = dept === 'all' || s.department === dept;
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [studentList, search, dept, statusFilter]);

  const handleDeactivate = () => {
    if (!deactivateTarget) return;
    setStudentList((prev) => prev.map((s) => s.id === deactivateTarget.id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
    showToast(`${deactivateTarget.name} has been ${deactivateTarget.status === 'Active' ? 'deactivated' : 'activated'}`, 'info');
    setDeactivateTarget(null);
  };

  return (
    <DashboardLayout variant="admin">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Admin', to: '/admin' }, { label: 'Manage Students' }]} />

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">Manage Students</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">View and manage student accounts.</p>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, or ID..." suggestions={students.map((s) => s.name)} />
            </div>
            <Select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              options={[{ value: 'all', label: 'All Departments' }, ...departments.map((d) => ({ value: d, label: d }))]}
              icon={<Filter className="w-4 h-4" />}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </div>
        </Card>

        {loading ? (
          <TableSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <Card>
            <EmptyState icon={<Search className="w-8 h-8" />} title="No students found" description="Try adjusting your search or filters." />
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Student</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Department</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Courses</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Waitlisted</th>
                    <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Status</th>
                    <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={student.name} size="md" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{student.name}</p>
                            <p className="text-xs text-slate-400 truncate">{student.studentId} · {student.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-slate-600 dark:text-slate-300">{student.department}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{student.enrolledCount}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span className="text-sm font-semibold text-amber-600">{student.waitlistCount}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={student.status === 'Active' ? 'active' : 'inactive'} dot>{student.status}</Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => navigate(`/admin/students/${student.id}`)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500/10 transition-all" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeactivateTarget(student)} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${student.status === 'Active' ? 'text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10' : 'text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10'}`} title={student.status === 'Active' ? 'Deactivate' : 'Activate'}>
                            <UserX className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      <ConfirmDialog
        open={!!deactivateTarget}
        onClose={() => setDeactivateTarget(null)}
        onConfirm={handleDeactivate}
        title={deactivateTarget?.status === 'Active' ? 'Deactivate this student?' : 'Activate this student?'}
        message={`${deactivateTarget?.status === 'Active' ? 'Deactivating' : 'Activating'} ${deactivateTarget?.name} will ${deactivateTarget?.status === 'Active' ? 'prevent them from accessing the platform' : 'restore their access'}.`}
        confirmLabel={deactivateTarget?.status === 'Active' ? 'Deactivate' : 'Activate'}
        variant="danger"
      />
    </DashboardLayout>
  );
}
