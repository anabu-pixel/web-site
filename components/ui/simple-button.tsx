"use client"

import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "lg"
  children: React.ReactNode
}

export function SimpleButton({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
  
  const variants = {
    default: "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white",
    outline: "bg-transparent border-2 border-cyan-400 hover:bg-cyan-600/30 text-white",
  }
  
  const sizes = {
    default: "px-4 py-2",
    lg: "px-10 py-4 text-lg",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
