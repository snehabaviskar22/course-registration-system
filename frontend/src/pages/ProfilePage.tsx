import { useState, useEffect } from 'react';
import { Mail, Hash, Building2, Calendar, Lock, Camera, Save, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
//import { departments } from '../data/mockData';
import { getDepartments } from "../api/auth";
import {
    getStudentProfile,
    updateStudentProfile,
    changePassword
} from "../api/auth";

export function ProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: (user as any)?.department || '',
    year: (user as any)?.year || '',
    studentId: (user as any)?.studentId || '',
  });
  const [saving, setSaving] = useState(false);
const [loading, setLoading] = useState(true);
const [departments, setDepartments] = useState<any[]>([]);

const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

useEffect(() => {

    async function loadProfile() {

        if (!user) return;

        const [profile, deptList] = await Promise.all([
            getStudentProfile(user.id),
            getDepartments()
        ]);

        setForm({
            name: profile.name,
            email: profile.email,
            department: profile.department,
            year: profile.year.toString(),
            studentId: profile.studentId
        });

        setDepartments(deptList);

        setLoading(false);
    }

    loadProfile();

}, [user]);


 const handleSave = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!user) return;

    setSaving(true);

    try {

        await updateStudentProfile(user.id, {
    name: form.name,
    email: form.email,
    department: {
        name: form.department
    },
    year: Number(form.year)
});

        showToast("Profile updated successfully", "success");

    } catch (err) {

        showToast("Failed to update profile", "error");

    } finally {

        setSaving(false);

    }
};
const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
});

  return (
    <DashboardLayout variant="student">
      <div className="animate-fade-in">
        <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Profile' }]} />

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">Student Profile</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal information and account settings.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar name={form.name} size="xl" />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-sm hover:bg-brand-700 transition-all btn-press">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100">{form.name}</h2>
            <p className="text-sm text-slate-400 mb-3">{form.email}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active Student
            </div>
            <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3 text-left">
              <div className="flex items-center gap-2.5 text-sm">
                <Hash className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Student ID:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{form.studentId}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Department:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{form.department}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Year:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{form.year}</span>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-5">
            <Card className="p-6">
              <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-4">Personal Information</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" name="name" value={form.name} onChange={(e) => update('name', e.target.value)} icon={<CheckCircle2 className="w-4 h-4" />} />
                  <Input label="Email Address" type="email" name="email" value={form.email} onChange={(e) => update('email', e.target.value)} icon={<Mail className="w-4 h-4" />} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select
                    label="Department"
                    name="department"
                    value={form.department}
                    onChange={(e) => update('department', e.target.value)}
                    options={departments.map((d) => ({value: d.name,label: d.name}))}
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
                <div className="flex justify-end">
                  <Button type="submit" icon={<Save className="w-4 h-4" />} loading={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-4">Change Password</h2>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Password updated', 'success'); }} className="space-y-4">
                <Input label="Current Password" type="password" name="currentPassword" placeholder="Enter current password" icon={<Lock className="w-4 h-4" />} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="New Password" type="password" name="newPassword" placeholder="Enter new password" icon={<Lock className="w-4 h-4" />} />
                  <Input label="Confirm Password" type="password" name="confirmPassword" placeholder="Re-enter new password" icon={<Lock className="w-4 h-4" />} />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" variant="outline">Update Password</Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
