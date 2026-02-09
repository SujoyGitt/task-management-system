import "./project-card.scss";

const ProjectCard = ({
  title,
  description,
  deadline,
  status,
  issues,
  members,
}) => {
  return (
   <div className="bg-(--card-bg) border border-(--border) p-4 rounded-lg space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base text-(--text)">
          {title}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded font-medium ${
            status.toLowerCase() === "ontrack"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-(--muted) mt-2">
        {description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-(--muted) mt-3">
        <span className="font-medium">{deadline}</span>

        <div className="flex items-center gap-3">
          {/* Avatars */}
          <div className="flex items-center">
            {members.map((m, i) => (
              <img
                key={i}
                src={m}
                alt="member"
                className={`w-6 h-6 rounded-full border-2 border-(--card-bg) ${
                  i !== 0 ? "-ml-2" : ""
                }`}
              />
            ))}
            <span className="w-6 h-6 -ml-2 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-xs font-medium">
              +2
            </span>
          </div>

          <span className="text-gray-500">{issues} issues</span>
        </div>
      </div>
    </div>

  );
};

export default ProjectCard;
