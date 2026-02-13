
const ProjectCard = ({
  title,
  description,
  deadline,
  status,
  issues,
  members,
}) => {
  const getStatusStyle = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "ontrack" || statusLower === "on track") {
      return {
        bg: "bg-gradient-to-r from-green-500/10 to-emerald-500/10",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-500/30",
        dot: "bg-green-500",
      };
    } else if (statusLower === "at risk") {
      return {
        bg: "bg-gradient-to-r from-yellow-500/10 to-amber-500/10",
        text: "text-yellow-600 dark:text-yellow-400",
        border: "border-yellow-500/30",
        dot: "bg-yellow-500",
      };
    } else {
      return {
        bg: "bg-gradient-to-r from-red-500/10 to-rose-500/10",
        text: "text-red-600 dark:text-red-400",
        border: "border-red-500/30",
        dot: "bg-red-500",
      };
    }
  };

  const statusStyle = getStatusStyle(status);

  return (
    <div className="group relative bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--primary)]/10 hover:-translate-y-1 hover:border-[var(--primary)]/30">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition-colors duration-300 leading-tight mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <svg className="w-3.5 h-3.5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-xs font-medium text-[var(--muted)]">Project</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${statusStyle.bg} border ${statusStyle.border} backdrop-blur-sm transition-all duration-300 group-hover:scale-105`}>
            <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} animate-pulse`}></div>
            <span className={`text-xs font-bold uppercase tracking-wider ${statusStyle.text}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

        {/* Footer */}
        <div className="flex justify-between items-center gap-4">
          {/* Deadline */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/10 transition-all duration-300 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/20">
            <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-semibold text-[var(--text)]">{deadline}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Team Members */}
            <div className="flex items-center -space-x-2 group/avatars">
              {members.slice(0, 3).map((m, i) => (
                <div
                  key={i}
                  className="relative transition-all duration-300 hover:scale-110 hover:z-10"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <img
                    src={m}
                    alt={`member-${i}`}
                    className="w-8 h-8 rounded-full border-2 border-[var(--card-bg)] ring-2 ring-[var(--primary)]/20 group-hover/avatars:ring-[var(--primary)]/40 transition-all duration-300 object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--card-bg)]"></div>
                </div>
              ))}
              {members.length > 3 && (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 border-2 border-[var(--card-bg)] text-[var(--bg)] text-xs font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer">
                  +{members.length - 3}
                </div>
              )}
            </div>

            {/* Issues Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 cursor-pointer group/issues">
              <svg className="w-3.5 h-3.5 text-[var(--muted)] group-hover/issues:text-[var(--primary)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-[var(--muted)] group-hover/issues:text-[var(--primary)] transition-colors duration-300">
                {issues}
              </span>
            </div>
          </div>
        </div>

    
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;