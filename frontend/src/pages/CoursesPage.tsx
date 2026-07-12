import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, LayoutGrid, List, Filter, X } from 'lucide-react';
import { getCourses, getDepartments } from "../api/auth";
//import type { Course } from "../types/course";
import { CourseCard, CourseCardList } from '../components/CourseCard';
import { SearchBar } from '../components/ui/SearchBar';
import { Select } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { CourseCardSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';



export function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const [semester, setSemester] = useState('all');
  const [sort, setSort] = useState('name');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<any>(null);
  const { showToast } = useToast();
  const { user } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {

    async function loadData() {

        try {

            const [courseList, deptList] = await Promise.all([
                getCourses(),
                getDepartments()
            ]);

            setCourses(courseList);
            setDepartments(deptList);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    loadData();

}, []);

  const semesters = [...new Set(courses.map(c => c.semester))];

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase());
      const selectedDepartment = departments.find(
    d => d.id.toString() === dept
);

const matchDept =
    dept === "all" ||
    c.department === selectedDepartment?.name;
      const matchSem = semester === 'all' || c.semester === semester;
      return matchSearch && matchDept && matchSem;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'credits') return b.credits - a.credits;
      if (sort === 'deadline') return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
      if (sort === 'availability') return (b.capacity - b.enrolled) - (a.capacity - a.enrolled);
      return 0;
    });

    return result;
  }, [search, dept, semester, sort]);

  const handleAction = (course: any) => {
    if (!user) {
      showToast('Please log in to register for courses', 'info');
      navigate('/login');
      return;
    }
    setSelected(course);
  };

  const confirmAction = () => {
    if (!selected) return;
    showToast(`Successfully registered for ${selected.name}`, "success");
setSelected(null);
  };

  const hasFilters = dept !== 'all' || semester !== 'all' || search !== '';

  return (
    <div className="pt-20 animate-fade-in">
      <div className="mesh-bg py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-800 dark:text-white mb-2">
            Course Catalog
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Browse {courses.length} courses available for registration across {departments.length} departments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by course name, code, or instructor..."
                suggestions={courses.map((c) => `${c.code} — ${c.name}`)}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                options={[
  { value: "all", label: "All Departments" },
  ...departments.map((d) => ({
    value: d.id.toString(),
    label: d.name
  }))
]}
                icon={<Filter className="w-4 h-4" />}
                className="min-w-[160px]"
              />
              <Select
    value={semester}
    onChange={(e) => setSemester(e.target.value)}
    options={[
    { value: "all", label: "All Semesters" },
    ...semesters.map(s => ({
        value: s,
        label: s
    }))
    ]}
    className="min-w-[140px]"
/>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                options={[
                  { value: 'name', label: 'Sort: Name' },
                  { value: 'credits', label: 'Sort: Credits' },
                  { value: 'deadline', label: 'Sort: Deadline' },
                  { value: 'availability', label: 'Sort: Availability' },
                ]}
              />
              <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`w-11 h-11 flex items-center justify-center transition-all ${view === 'grid' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <LayoutGrid className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`w-11 h-11 flex items-center justify-center transition-all ${view === 'list' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <List className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {hasFilters && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400">{filtered.length} courses found</span>
              <button
                onClick={() => { setSearch(''); setDept('all'); setSemester('all'); }}
                className="ml-auto flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            </div>
          )}
        </Card>

        {loading ? (
          <div className={view === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-3'}>
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <EmptyState
              title="No courses found"
              description="Try adjusting your search or filters to find what you're looking for."
              action={<Button variant="outline" onClick={() => { setSearch(''); setDept('all'); setSemester('all'); }}>Clear all filters</Button>}
            />
          </Card>
        ) : view === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, i) => (
              <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <CourseCard course={course} onAction={handleAction} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((course, i) => (
              <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <CourseCardList course={course} onAction={handleAction} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? "Confirm Registration" : ""}
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
            <Button
    onClick={confirmAction}
    variant="primary"
>
              Confirm
            </Button>
          </>
        }
      >
        {selected && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
                <span className="text-lg font-bold">{selected.code.split('-')[0][0]}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-600">{selected.code}</p>
                <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100">{selected.name}</h3>
                <p className="text-sm text-slate-400">{selected.instructor} · {selected.credits} credits</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{selected.description}</p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Department</span><span className="font-semibold text-slate-700 dark:text-slate-200">{selected.department}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Semester</span><span className="font-semibold text-slate-700 dark:text-slate-200">{selected.semester}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Available Seats</span><span className="font-semibold text-emerald-600">{Math.max(0, selected.capacity - selected.enrolled)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Deadline</span><span className="font-semibold text-slate-700 dark:text-slate-200">{new Date(selected.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
