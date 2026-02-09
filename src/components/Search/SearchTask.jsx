import React from "react";
const SearchTask = ({ searchText, setSearchText, setActiveTag, activeTag }) => {
  const tags = ["ALL", "DEV", "QA", "Product Owner"];

  return (
    <div className="bg-(--card-bg) border border-(--border) rounded-xl p-4 space-y-4 shadow-sm flex items-center justify-between flex-wrap mt-5">
    
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="
          wfu md:w-3/5 rounded-lg border border-(--border)
          bg-transparent px-4 py-2
          text-[var(--text)] placeholder-[var(--muted)]
          focus:outline-none focus:ring-2 focus:ring-[var(--primary)] mb-0
        "
      />

      <div className="flex flex-wrap gap-2 mt-4 md:">
        {tags.map((tag) => {
          tag = tag === "Product Owner" ? "PO" : tag
          const isActive = activeTag === tag;

          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`
                rounded-full px-4 py-1.5 text-xs font-medium
                transition-all
                ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--bg)]"
                    : "border border-(--border) text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--border)]/40"
                }
              `}
            >
              {tag === "Product Owner" ? "PO" : tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchTask;
