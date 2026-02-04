import React from "react";

const RevealLines = ({ lines = [], className = "" }) => {
  return (
    <div className="space-y-3">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`opacity-0 translate-y-2 animate-[fadeUp_.4s_ease_forwards] ${className}`}
          style={{ animationDelay: `${i * 120}ms` }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default React.memo(RevealLines);
