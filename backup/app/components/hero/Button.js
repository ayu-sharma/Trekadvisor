"use client";

import Image from "next/image";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  className = "",
  ...props
}) {
  const baseStyles = "flex items-center justify-center gap-2 transition-all rounded-lg font-medium cursor-pointer";
  
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-green-500 hover:shadow-md",
    text: "bg-transparent text-gray-700 hover:text-green-600",
    icon: "bg-transparent text-gray-500 hover:text-green-600"
  };

  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg"
  };

  const iconStyles = {
    left: "flex-row",
    right: "flex-row-reverse"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${iconStyles[iconPosition]} ${className}`}
      {...props}
    >
      {icon && (
        <Image
          src={icon}
          alt="Button icon"
          width={20}
          height={20}
          className={variant === "primary" ? "text-white" : "text-current"}
        />
      )}
      {children}
    </button>
  );
} 