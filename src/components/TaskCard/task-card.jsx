import React, { useState } from "react";
import Tag from "../Tag/Tag";
import closeIcon from "../../assets/delete-icon.png";
import { tagNameMap } from "../../constant/common";

const TaskCard = ({
  id,
  tags,
  title,
  handleDelete,
  handleEdit,
  taskIndex,
  setActiveCard,
  selectedTags,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const checkTag = (tag) => {
    return selectedTags.some((item) => item === tag);
    // selectedTags = ["DEV", "QA", "Product Owner"]
  };

  const handleSave = () => {
    if (!editedTitle.trim()) return;
    handleEdit(id, editedTitle);
    setIsEditing(false);
  };

  return (
    <article
      draggable={!isEditing}
      onDragStart={() => setActiveCard(taskIndex)}
      onDragEnd={() => setActiveCard(null)}
      className="
        rounded-lg border border-(--border)
        bg-(--bg)
        p-3
        cursor-grab
        active:cursor-grabbing
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      {!isEditing ? (
        <p className="text-sm font-medium text-[var(--text)]">{title}</p>
      ) : (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          autoFocus
          className="
            w-full rounded-md
            border border-(--border)
            bg-transparent px-2 py-1
            text-sm text-[var(--text)]
            focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
          "
        />
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {tags.map((elem, key) => (
            <Tag key={key} tagName={elem} selected={checkTag(elem)} />
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[var(--muted)] hover:text-[var(--text)] cursor-pointer"
            >
              ✏️
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="text-[var(--primary)] font-medium cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[var(--muted)] cursor-pointer"
              >
                Cancel
              </button>
            </>
          )}

          <button
            onClick={() => handleDelete(id)}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          >
            <img src={closeIcon} alt="Delete" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
