import { useState } from 'react';
import { Save, X, BookOpen } from 'lucide-react';
import { DashboardLayout } from '../../components/Sidebar';
import { Card } from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { useToast } from '../../context/ToastContext';
import { useRouter } from '../../context/RouterContext';
import { departments, semesters } from '../../data/mockData';

export function CourseFormPage({ mode }: { mode: 'create' | 'edit' }) {
  const { showToast } = useToast();
  const { navigate } = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    code: '',
    instructor: '',
    department: '',
    semester: semesters[0],
    credits: '3',
    capacity: '40',
    deadline: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = 'Course name is required';
    if (!form.code) e.code = 'Course code is required';
    if (!form.instructor) e.instructor = 'Instructor is required';
    if (!form.department) e.department = 'Department is required';
    if (!form.deadline) e.deadline = 'Deadline is required';
    if (Number(form.credits) < 1 || Number(form.credits) > 6) e.credits = 'Credits must be 1-6';
    if (Number(form.capacity) < 1) e.capacity = 'Capacity must be at least 1';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast(mode === 'create' ? 'Course created successfully!' : 'Course updated successfully!', 'success');
      navigate('/admin/courses');
    }, 800);
  };

  return (
    <DashboardLayout variant="admin">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Admin', to: '/admin' }, { label: 'Manage Courses', to: '/admin/courses' }, { label: mode === 'create' ? 'Add Course' : 'Edit Course' }]} />

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">
            {mode === 'create' ? 'Add New Course' : 'Edit Course'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {mode === 'create' ? 'Create a new course offering for students to register.' : 'Update course information and settings.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100">Course Information</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Course Name" name="name" placeholder="e.g. Data Structures" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
              <Input label="Course Code" name="code" placeholder="e.g. CS-301" value={form.code} onChange={(e) => update('code', e.target.value)} error={errors.code} />
              <Input label="Instructor" name="instructor" placeholder="e.g. Dr. Alan Turing" value={form.instructor} onChange={(e) => update('instructor', e.target.value)} error={errors.instructor} />
              <Select
                label="Department"
                name="department"
                value={form.department}
                onChange={(e) => update('department', e.target.value)}
                options={[{ value: '', label: 'Select...' }, ...departments.map((d) => ({ value: d, label: d }))]}
              />
              <Select
                label="Semester"
                name="semester"
                value={form.semester}
                onChange={(e) => update('semester', e.target.value)}
                options={semesters.map((s) => ({ value: s, label: s }))}
              />
              <Input label="Credits" type="number" name="credits" min="1" max="6" value={form.credits} onChange={(e) => update('credits', e.target.value)} error={errors.credits} />
              <Input label="Capacity" type="number" name="capacity" min="1" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} error={errors.capacity} />
              <Input label="Registration Deadline" type="date" name="deadline" value={form.deadline} onChange={(e) => update('deadline', e.target.value)} error={errors.deadline} />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Course description and objectives..."
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
              />
            </div>
          </Card>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" icon={<X className="w-4 h-4" />} onClick={() => navigate('/admin/courses')}>
              Cancel
            </Button>
            <Button type="submit" icon={<Save className="w-4 h-4" />} loading={saving}>
              {saving ? 'Saving...' : mode === 'create' ? 'Create Course' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
