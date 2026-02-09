import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setshowDrop] = useState(false);

  return (
    <div
      onDragEnter={() => setshowDrop(true)}
      onDragLeave={() => setshowDrop(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop();
        setshowDrop(false);
      }}
      className="
        mx-3 my-1 rounded-lg
        border-2 border-dashed
        transition-colors transition-opacity
      "
      style={{
        borderColor: showDrop ? "var(--primary)" : "transparent",
        backgroundColor: showDrop
          ? "color-mix(in srgb, var(--primary) 12%, transparent)"
          : "transparent",
        opacity: showDrop ? 1 : 0,
        height: showDrop ? "3.5rem" : "0.5rem",
      }}
    >
      <p className="text-center text-xs leading-[3.5rem] text-[var(--muted)] pointer-events-none">
        Drop here
      </p>
    </div>
  );
};

export default DropArea;
