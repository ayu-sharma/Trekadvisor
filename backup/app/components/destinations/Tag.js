"use client";

const Tag = ({ text }) => {
  return (
    <span className="px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
      {text}
    </span>
  );
};

export default Tag; 