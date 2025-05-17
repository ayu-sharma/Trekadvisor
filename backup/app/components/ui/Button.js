"use client";

const Button = ({ children, className, variant = "default", onClick, ...props }) => {
  const baseClasses = "flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out cursor-pointer";
  
  const variantClasses = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50",
    text: "text-emerald-600 hover:bg-emerald-50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 