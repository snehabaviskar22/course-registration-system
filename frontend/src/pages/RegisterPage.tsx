import { useState , useEffect} from 'react';
import { Mail, Lock, User, Hash, Building2, Calendar, Eye, EyeOff, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Input, Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, useRouter } from '../context/RouterContext';
import { useToast } from '../context/ToastContext';
import { getDepartments } from "../api/auth";
import { registerStudent } from "../api/auth";



export function RegisterPage() {
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    studentId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {

    async function loadDepartments() {

        const deptList = await getDepartments();

        setDepartments(deptList);

    }

    loadDepartments();

}, []);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match';
    if (!form.department) e.department = 'Select a department';
    if (!form.year) e.year = 'Select your year';
    if (!form.studentId) e.studentId = 'Student ID is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

/////
  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {

    const response = await registerStudent({
      studentId: form.studentId,
      name: form.name,
      email: form.email,
      password: form.password,
      departmentId: Number(form.department),
year: Number(form.year),
      avatar: ""
    });

    if (response.id) {

      setSuccess(true);

      setTimeout(() => {
        showToast("Account created successfully!", "success");
        navigate("/login");
      }, 1500);

    } else {

      showToast(response.message || "Registration failed", "error");

    }

  } catch (err) {

    showToast("Unable to connect to server", "error");

  }

  setLoading(false);
};

////
  if (success) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
        <div className="text-center animate-fade-in-scale">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-2">Account Created!</h2>
          <p className="text-slate-500 dark:text-slate-400">Redirecting to your dashboard...</p>
          <div className="w-32 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-5 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full animate-[shrink_1.5s_ease-in-out]" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4 pt-24 pb-12">
      <div className="w-full max-w-lg animate-fade-in-scale">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm shadow-brand-600/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-slate-800 dark:text-white">UniReg</span>
          </Link>
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">Create your account</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Join the platform in less than a minute</p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              placeholder="Sneha Patel"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@university.edu"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  error={errors.password}
                  icon={<Lock className="w-4 h-4" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Department"
                name="department"
                value={form.department}
                onChange={(e) => update('department', e.target.value)}
               options={[
    { value: "", label: "Select..." },
    ...departments.map((d) => ({
        value: d.id.toString(),
        label: d.name
    }))
]}

                icon={<Building2 className="w-4 h-4" />}
              />
              <Select
                label="Year"
                name="year"
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                options={[
    { value: "", label: "Select..." },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" }
]}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>

            <Input
              label="Student ID"
              name="studentId"
              placeholder="e.g. CS-2023-045"
              value={form.studentId}
              onChange={(e) => update('studentId', e.target.value)}
              error={errors.studentId}
              icon={<Hash className="w-4 h-4" />}
            />

            <Button type="submit" fullWidth size="lg" loading={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
