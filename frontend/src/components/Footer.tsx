import { GraduationCap, Twitter, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '../context/RouterContext';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold font-display text-slate-800 dark:text-white">UniReg</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              The modern course registration platform with intelligent waitlist management for universities.
            </p>
            <div className="flex gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-brand-600 hover:text-white transition-all btn-press"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'Courses', to: '/courses' },
                { label: 'About', to: '/about' },
                { label: 'Login', to: '/login' },
                { label: 'Register', to: '/register' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 font-display">Resources</h4>
            <ul className="space-y-2.5">
              {['Student Guide', 'Registration FAQ', 'Waitlist Policy', 'Academic Calendar', 'Support Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 font-display">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-500 shrink-0" />
                123 University Ave, Boston, MA 02115
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                registrar@university.edu
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                (617) 555-0100
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© 2026 UniReg Platform. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-slate-400 hover:text-brand-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-brand-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-slate-400 hover:text-brand-600 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
