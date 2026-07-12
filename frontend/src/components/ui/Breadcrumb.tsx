import { ChevronRight } from 'lucide-react';
import { Link } from '../../context/RouterContext';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          {item.to ? (
            <Link
              to={item.to}
              className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
