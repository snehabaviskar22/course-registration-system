import { useState, useMemo, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { courses, departments, semesters, getCourseStatus, type Course } from '../data/mockData';
import { CourseCard } from '../components/CourseCard';
import { DashboardLayout } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { SearchBar } from '../components/ui/SearchBar';
import { Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { CourseCardSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../context/ToastContext';

export function BrowseCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const [semester, setSemester] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Course | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
      const matchDept = dept === 'all' || c.department === dept;
      const matchSem = semester === 'all' || c.semester === semester;
      const matchStatus = statusFilter === 'all' || getCourseStatus(c) === statusFilter;
      return matchSearch && matchDept && matchSem && matchStatus;
    });
  }, [search, dept, semester, statusFilter]);

  const handleAction = (course: Course) => setSelected(course);

  const confirmAction = () => {
    if (!selected) return;
    const status = getCourseStatus(selected);
    if (status === 'OPEN' || status === 'LIMITED') {
      showToast(`Successfully registered for ${selected.name}`, 'success');
    } else if (status === 'WAITLIST') {
      showToast(`Added to waitlist for ${selected.name}`, 'warning');
    }
    setSelected(null);
  };

  const hasFilters = dept !== 'all' || semester !== 'all' || statusFilter !== 'all' || search !== '';

  return (
    <DashboardLayout variant="student">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Browse Courses' }]} />

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">Browse Courses</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Discover and register for available courses this semester.</p>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search courses..."
                suggestions={courses.map((c) => c.name)}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                options={[{ value: 'all', label: 'All Departments' }, ...departments.map((d) => ({ value: d, label: d }))]}
                icon={<Filter className="w-4 h-4" />}
              />
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                options={[{ value: 'all', label: 'All Semesters' }, ...semesters.map((s) => ({ value: s, label: s }))]}
              />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'OPEN', label: 'Open' },
                  { value: 'LIMITED', label: 'Limited' },
                  { value: 'WAITLIST', label: 'Waitlist' },
                ]}
              />
            </div>
          </div>
          {hasFilters && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">{filtered.length} courses</span>
              <button onClick={() => { setSearch(''); setDept('all'); setSemester('all'); setStatusFilter('all'); }} className="ml-auto flex items-center gap-1 text-xs font-semibold text-brand-600">
                <X className="w-3 h-3" /> Clear
              </button>
            </div>
          )}
        </Card>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <EmptyState title="No courses found" description="Try adjusting your filters." action={<Button variant="outline" onClick={() => { setSearch(''); setDept('all'); setSemester('all'); setStatusFilter('all'); }}>Clear filters</Button>} />
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, i) => (
              <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <CourseCard course={course} onAction={handleAction} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? (getCourseStatus(selected) === 'WAITLIST' ? 'Join Waitlist' : 'Confirm Registration') : ''}
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
            <Button onClick={confirmAction} variant={selected && getCourseStatus(selected) === 'WAITLIST' ? 'secondary' : 'primary'}>
              {selected && getCourseStatus(selected) === 'WAITLIST' ? 'Join Waitlist' : 'Confirm'}
            </Button>
          </>
        }
      >
        {selected && (
          <div>
            <p className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">
              {getCourseStatus(selected) === 'WAITLIST' ? 'Join the waitlist for' : 'Register for'} <span className="text-brand-600">{selected.name}</span>?
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{selected.description}</p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Instructor</span><span className="font-semibold text-slate-700 dark:text-slate-200">{selected.instructor}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Credits</span><span className="font-semibold text-slate-700 dark:text-slate-200">{selected.credits}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Available Seats</span><span className="font-semibold text-emerald-600">{Math.max(0, selected.capacity - selected.enrolled)}</span></div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
