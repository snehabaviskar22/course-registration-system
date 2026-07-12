interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-20 h-20 text-2xl',
};

const gradients = [
  'from-brand-500 to-brand-600',
  'from-accent-emerald to-teal-500',
  'from-accent-orange to-amber-500',
  'from-accent-purple to-fuchsia-500',
  'from-rose-500 to-pink-500',
  'from-cyan-500 to-blue-500',
];

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const gradient = gradients[name.charCodeAt(0) % gradients.length];

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} text-white font-bold flex items-center justify-center shrink-0 shadow-sm ${className}`}
    >
      {initials}
    </div>
  );
}
