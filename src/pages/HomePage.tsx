import {
  ArrowRight,
  Zap,
  Clock,
  LayoutDashboard,
  Smartphone,
  CheckCircle2,
  Star,
  Quote,
  GraduationCap,
  Users,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { Link } from '../context/RouterContext';
import { Button } from '../components/ui/Button';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Avatar } from '../components/ui/Avatar';

export function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative mesh-bg pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-purple/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-brand-700 dark:text-brand-300">Registration for Fall 2026 is now open</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-5 animate-slide-up">
              Build Your Future Through{' '}
              <span className="gradient-text">Better Learning</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up animate-delay-100">
              The modern course registration platform with intelligent waitlist management. Register in seconds, track availability in real-time, and never miss a deadline.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-slide-up animate-delay-200">
              <Link to="/register">
                <Button size="lg" icon={<GraduationCap className="w-5 h-5" />}>
                  Start Learning
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" iconRight={<ArrowRight className="w-5 h-5" />}>
                  Browse Courses
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start animate-fade-in animate-delay-300">
              <div className="flex -space-x-2">
                {['Sneha Patel', 'Marcus Chen', 'Aisha Rahman', 'David Kim'].map((name) => (
                  <Avatar key={name} name={name} size="sm" className="ring-2 ring-white dark:ring-slate-950" />
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-200">500+</span> students registered this semester
              </p>
            </div>
          </div>

          <div className="relative animate-fade-in-scale animate-delay-200">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative">
      <div className="glass-card rounded-3xl p-6 shadow-float">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-slate-400">unireg.edu/dashboard</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-4 text-white">
            <BookOpen className="w-5 h-5 mb-2 opacity-80" />
            <p className="text-2xl font-bold font-display">2</p>
            <p className="text-xs opacity-80">Enrolled</p>
          </div>
          <div className="bg-gradient-to-br from-accent-orange to-amber-500 rounded-2xl p-4 text-white">
            <Clock className="w-5 h-5 mb-2 opacity-80" />
            <p className="text-2xl font-bold font-display">2</p>
            <p className="text-xs opacity-80">Waitlisted</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            { name: 'Data Structures', code: 'CS-301', status: 'Enrolled', color: 'bg-emerald-500' },
            { name: 'Advanced Java', code: 'CS-410', status: 'Waitlist #2', color: 'bg-amber-500' },
            { name: 'Linear Algebra', code: 'MTH-201', status: 'Enrolled', color: 'bg-emerald-500' },
          ].map((c) => (
            <div key={c.code} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center text-white text-xs font-bold`}>
                {c.code.split('-')[0][0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{c.name}</p>
                <p className="text-xs text-slate-400">{c.code}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status.includes('Waitlist') ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-3 shadow-float animate-float-slow">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Registered!</p>
            <p className="text-[10px] text-slate-400">Just now</p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-3 shadow-float animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Seat opened</p>
            <p className="text-[10px] text-slate-400">Waitlist update</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsSection() {
  const stats = [
    { value: 500, suffix: '+', label: 'Students Registered', icon: Users, color: 'from-brand-500 to-brand-600' },
    { value: 120, suffix: '', label: 'Courses Available', icon: BookOpen, color: 'from-accent-emerald to-teal-500' },
    { value: 95, suffix: '%', label: 'Completion Rate', icon: TrendingUp, color: 'from-accent-orange to-amber-500' },
    { value: 24, suffix: '/7', label: 'Support Available', icon: Clock, color: 'from-accent-purple to-fuchsia-500' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3 shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold font-display text-slate-800 dark:text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Easy Registration',
      desc: 'Register for courses in seconds with a streamlined, one-click process designed for students.',
      color: 'from-brand-500 to-brand-600',
    },
    {
      icon: Clock,
      title: 'Automatic Waitlist',
      desc: 'Get automatically added to waitlists when courses are full, with real-time position tracking.',
      color: 'from-accent-orange to-amber-500',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Availability',
      desc: 'See live seat counts and course availability updated instantly as students register or drop.',
      color: 'from-accent-emerald to-teal-500',
    },
    {
      icon: LayoutDashboard,
      title: 'Student Dashboard',
      desc: 'A centralized hub to manage enrollments, track deadlines, and view your academic progress.',
      color: 'from-accent-purple to-fuchsia-500',
    },
    {
      icon: Smartphone,
      title: 'Responsive Learning',
      desc: 'Access your courses and registration on any device — desktop, tablet, or mobile.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: CheckCircle2,
      title: 'Smart Notifications',
      desc: 'Get instant alerts when waitlist positions change or registration deadlines approach.',
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-800 dark:text-white mt-2 mb-3">
            Everything you need to register smarter
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A complete platform built for modern universities and their students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800 shadow-card card-hover animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sneha Patel',
      role: 'CS Junior',
      text: 'The waitlist system is a game-changer. I got into Java Programming when a seat opened up — got notified instantly and confirmed in one click.',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Engineering Senior',
      text: 'Finally a registration system that feels modern. The dashboard shows everything I need at a glance. No more spreadsheets.',
      rating: 5,
    },
    {
      name: 'Aisha Rahman',
      role: 'Biology Sophomore',
      text: 'I love the real-time seat counts. I knew exactly which courses had space before the deadline. So much less stressful.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-800 dark:text-white mt-2 mb-3">
            Loved by students
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-brand-200 dark:text-brand-500/30 mb-3" />
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="md" />
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-10 sm:p-14 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-purple/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Ready to register for your courses?
            </h2>
            <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of students using UniReg for a seamless registration experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-brand-50">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
