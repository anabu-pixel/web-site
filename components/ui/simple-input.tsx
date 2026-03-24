"use client"

import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SimpleInput({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full px-5 py-4 liquid-glass-input rounded-2xl text-white placeholder:text-gray-500 focus:outline-none transition-all font-[family-name:var(--font-space)] ${className}`}
      {...props}
    />
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function SimpleTextarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full px-5 py-4 liquid-glass-input rounded-2xl text-white placeholder:text-gray-500 focus:outline-none transition-all resize-none font-[family-name:var(--font-space)] ${className}`}
      {...props}
    />
  )
}
