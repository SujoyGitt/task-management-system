import React from 'react'
import { useTheme } from '../custom-hooks/useTheme';

const Toggle = () => {
  const { theme, toggleTheme } = useTheme();
    
  return (
    <button  onClick={toggleTheme}  className="text-sm border bg-(--primary) text-(--bg) p-2 rounded-full cursor-pointer">
          {theme === "light" ? "🌙" : "☀️"}
    </button>
  )
}

export default Toggle