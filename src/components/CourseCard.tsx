import { Users, BookUser, Calendar, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

type IconType = React.ComponentType<{ className?: string }>;
const iconMap = Icons as unknown as Record<string, IconType>;
import type { Course } from '../data/mockData';
import { getCourseStatus, getSeatsLeft } from '../data/mockData';
import { StatusBadge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface CourseCardProps {
  course: Course;
  onAction?: (course: Course) => void;
  actionLabel?: string;
  showDeadline?: boolean;
}


export function CourseCard({ course, onAction, actionLabel, showDeadline = true }: CourseCardProps) {
  const status = getCourseStatus(course);
  const seatsLeft = getSeatsLeft(course);
  const Icon = iconMap[course.icon] || Icons.BookOpen;
  const fillPct = Math.round((course.enrolled / course.capacity) * 100);

  return (
    <Card hover className="p-5 flex flex-col group">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 tracking-wide">{course.code}</span>
            <StatusBadge status={status} />
          </div>
          <h3 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 leading-snug truncate">
            {course.name}
          </h3>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <BookUser className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">{course.instructor}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Icons.Folder className="w-4 h-4 text-slate-400" />
            {course.department}
          </span>
          <span className="flex items-center gap-1.5">
            <Icons.Award className="w-4 h-4 text-slate-400" />
            {course.credits} cr
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {course.enrolled} / {course.capacity} enrolled
          </span>
          <span className={`font-bold ${seatsLeft > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Full'}
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${fillPct >= 100 ? 'bg-red-500' : fillPct >= 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>

      {showDeadline && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <Calendar className="w-3.5 h-3.5" />
          Deadline: {new Date(course.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      )}

      <div className="mt-auto">
        <Button
          fullWidth
          size="sm"
          variant={status === 'OPEN' || status === 'LIMITED' ? 'primary' : status === 'WAITLIST' ? 'secondary' : 'outline'}
          disabled={status === 'FULL'}
          onClick={() => onAction?.(course)}
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          {actionLabel || (status === 'OPEN' || status === 'LIMITED' ? 'Register' : status === 'WAITLIST' ? 'Join Waitlist' : 'Course Full')}
        </Button>
      </div>
    </Card>
  );
}

export function CourseCardList({ course, onAction, actionLabel }: CourseCardProps) {
  const status = getCourseStatus(course);
  const seatsLeft = getSeatsLeft(course);
  const Icon = iconMap[course.icon] || Icons.BookOpen;

  return (
    <Card hover className="p-4 flex items-center gap-4 group" onClick={() => onAction?.(course)}>
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-bold text-brand-600">{course.code}</span>
          <StatusBadge status={status} />
        </div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{course.name}</h3>
        <p className="text-xs text-slate-400 truncate">{course.instructor} · {course.credits} credits</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-sm font-bold ${seatsLeft > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {seatsLeft > 0 ? `${seatsLeft} left` : 'Full'}
        </p>
        <p className="text-xs text-slate-400">{course.enrolled}/{course.capacity}</p>
      </div>
      <Button size="sm" variant={status === 'FULL' ? 'outline' : 'primary'} disabled={status === 'FULL'}>
        {actionLabel || (status === 'WAITLIST' ? 'Waitlist' : 'Register')}
      </Button>
    </Card>
  );
}
