import { Home, ArrowLeft, Compass } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4 pt-24">
      <div className="text-center max-w-md animate-fade-in-scale">
        <div className="relative inline-block mb-6">
          <div className="text-[120px] font-bold font-display gradient-text leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="w-16 h-16 text-brand-300 dark:text-brand-500/40 animate-spin-slow" style={{ animation: 'spin 8s linear infinite' }} />
          </div>
        </div>
        <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-2">Page not found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button icon={<Home className="w-4 h-4" />}>Go Home</Button>
          </Link>
          <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
