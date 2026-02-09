import React from "react";
import { useTypewriter } from "../../hooks/useTypewritter";

const TypewriterText = ({ children, speed = 18, className = "" }) => {
  const typed = useTypewriter(children, speed);

  return <div className={className}>{typed}</div>;
};

export default React.memo(TypewriterText);
