import Link from 'next/link';

interface ProgramCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

export default function ProgramCard({ icon, title, description, href, comingSoon }: ProgramCardProps) {
  return (
    <div className="card p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <h3 className="font-heading font-bold text-text text-lg mb-2">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
      {comingSoon ? (
        <span className="pill bg-white/5 text-muted border border-white/10 text-xs self-start">
          Coming Soon
        </span>
      ) : (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-accent text-sm font-semibold hover:gap-2 transition-all duration-200 mt-auto"
        >
          Register →
        </Link>
      )}
    </div>
  );
}
