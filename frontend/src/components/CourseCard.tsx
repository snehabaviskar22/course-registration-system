import { Users, BookUser, Calendar, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  department: string;
  credits: number;
  capacity: number;
  enrolled: number;
  waitlistCount: number;
  waitlistCapacity: number;
  semester: string;
  registrationDeadline: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
  onAction?: (course: Course) => void;
  actionLabel?: string;
  showDeadline?: boolean;
}

const getSeatsLeft = (course: Course) => {
  return Math.max(0, course.capacity - course.enrolled);
};

export function CourseCard({
  course,
  onAction,
  actionLabel,
  showDeadline = true,
}: CourseCardProps) {
  const seatsLeft = getSeatsLeft(course);
  const fillPct = Math.round((course.enrolled / course.capacity) * 100);
  const Icon = Icons.BookOpen;
  const isFull = seatsLeft === 0;

  return (
    <Card hover className="p-5 flex flex-col group">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-brand-600">
            {course.code}
          </span>

          <h3 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 truncate mt-1">
            {course.name}
          </h3>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <BookUser className="w-4 h-4" />
          <span>{course.instructor}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1">
            <Icons.Folder className="w-4 h-4" />
            {course.department}
          </span>

          <span className="flex items-center gap-1">
            <Icons.Award className="w-4 h-4" />
            {course.credits} Credits
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.enrolled}/{course.capacity} enrolled
          </span>

          <span
            className={
              seatsLeft > 0
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {seatsLeft > 0 ? `${seatsLeft} seats left` : "Full"}
          </span>
        </div>

        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={
              fillPct >= 100
                ? "h-full bg-red-500"
                : fillPct >= 80
                ? "h-full bg-yellow-500"
                : "h-full bg-green-500"
            }
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>

      {showDeadline && (
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Calendar className="w-4 h-4" />
          Deadline:{" "}
          {new Date(course.registrationDeadline).toLocaleDateString()}
        </div>
      )}

      <Button
        fullWidth
        size="sm"
        variant={isFull ? "outline" : "primary"}
        disabled={isFull}
        onClick={() => onAction?.(course)}
        iconRight={<ArrowRight className="w-4 h-4" />}
      >
        {actionLabel || (isFull ? "Course Full" : "Register")}
      </Button>
    </Card>
  );
}

export function CourseCardList({
  course,
  onAction,
  actionLabel,
}: CourseCardProps) {
  const seatsLeft = getSeatsLeft(course);
  const Icon = Icons.BookOpen;
  const isFull = seatsLeft === 0;

  return (
    <Card
      hover
      className="p-4 flex items-center gap-4"
      onClick={() => onAction?.(course)}
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1">
        <span className="text-xs font-bold text-brand-600">
          {course.code}
        </span>

        <h3 className="font-bold mt-1">{course.name}</h3>

        <p className="text-sm text-slate-500">
          {course.instructor} • {course.credits} Credits
        </p>
      </div>

      <div className="text-right">
        <p
          className={
            seatsLeft > 0
              ? "text-green-600 font-bold"
              : "text-red-600 font-bold"
          }
        >
          {seatsLeft > 0 ? `${seatsLeft} left` : "Full"}
        </p>

        <p className="text-xs text-slate-400">
          {course.enrolled}/{course.capacity}
        </p>
      </div>

      <Button
        size="sm"
        variant={isFull ? "outline" : "primary"}
        disabled={isFull}
      >
        {actionLabel || (isFull ? "Course Full" : "Register")}
      </Button>
    </Card>
  );
}