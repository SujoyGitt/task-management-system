import React from "react";
import { tagNameMap, tagStyle } from "../../constant/common";

const Tag = ({ tagName, selectedTag, selected }) => {
  // 🗺️ translate UI name → internal key
  // const key = tagNameMap[tagName];
  // const style = selected ? tagStyle[key] : {};
const key = tagNameMap[tagName] ?? tagName; // map to internal key
const style = selected ? tagStyle[key] : {};

  return (
    <button
      type="button"
      onClick={() => selectedTag(key)}
      style={style}
      className={`px-3 py-1 rounded-full text-sm font-medium border
        border-[var(--border)]
        transition
        hover:bg-[var(--border)]
        ${!selected ? "text-[var(--text)]" : ""}
      `}
    >
      {tagName}
    </button>
  );
};



export default Tag;
