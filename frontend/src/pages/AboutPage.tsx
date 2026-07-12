import { Target, Eye, Heart, Users, BookOpen, Award, Shield, Zap } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { Button } from '../components/ui/Button';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

export function AboutPage() {
  return (
    <div className="pt-20 animate-fade-in">
      <section className="mesh-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">About Us</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-800 dark:text-white mt-3 mb-5 leading-tight">
            Reimagining university registration for the <span className="gradient-text">modern era</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            UniReg is a next-generation course registration platform built for universities that want to provide their students with a seamless, modern, and transparent enrollment experience.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To eliminate the stress and confusion of course registration by providing real-time data, intelligent waitlists, and a beautiful interface.', color: 'from-brand-500 to-brand-600' },
              { icon: Eye, title: 'Our Vision', desc: 'A world where every student can plan their academic journey with confidence, knowing exactly what courses are available and when.', color: 'from-accent-emerald to-teal-500' },
              { icon: Heart, title: 'Our Values', desc: 'Transparency, accessibility, and student-first design. We believe technology should reduce anxiety, not add to it.', color: 'from-accent-orange to-amber-500' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-display text-slate-800 dark:text-white mb-2">By the numbers</h2>
            <p className="text-slate-500 dark:text-slate-400">Trusted by universities and students alike.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: 500, suffix: '+', label: 'Active Students', icon: Users },
              { value: 120, suffix: '', label: 'Courses Offered', icon: BookOpen },
              { value: 95, suffix: '%', label: 'Satisfaction', icon: Award },
              { value: 24, suffix: '/7', label: 'Uptime', icon: Shield },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-card">
                  <Icon className="w-8 h-8 mx-auto text-brand-500 mb-3" />
                  <p className="text-3xl font-bold font-display text-slate-800 dark:text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-12 h-12 mx-auto text-brand-500 mb-4" />
          <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-3">Ready to experience the future of registration?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Join UniReg today and never stress about course registration again.</p>
          <Link to="/register">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
