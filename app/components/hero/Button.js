"use client";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}) {
  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-green-600 text-green-600 hover:bg-green-50 bg-transparent",
    ghost: "text-white hover:bg-white/10 bg-transparent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center space-x-2 font-medium px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
