"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const baseInput =
  "w-full bg-surface border border-line rounded-lg text-txt placeholder:text-txt3 transition-colors outline-none focus:border-gold";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className, id, required, ...props }, ref) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <div className={cn("mb-3", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-txt2 mb-1.5",
              required && "after:content-['*'] after:text-err after:ml-0.5"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-txt3">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            className={cn(
              baseInput,
              "px-4 py-2.5",
              leftIcon && "pl-10",
              error && "border-err focus:border-err"
            )}
            {...props}
          />
        </div>
        {error && <p className="text-err text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, required, ...props }, ref) => {
    const inputId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <div className={cn("mb-3", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-txt2 mb-1.5",
              required && "after:content-['*'] after:text-err after:ml-0.5"
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            baseInput,
            "px-4 py-2.5 min-h-[80px] resize-y",
            error && "border-err focus:border-err"
          )}
          {...props}
        />
        {error && <p className="text-err text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder, className, id, required, ...props },
    ref
  ) => {
    const inputId = id ?? `select-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <div className={cn("mb-3", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-txt2 mb-1.5",
              required && "after:content-['*'] after:text-err after:ml-0.5"
            )}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            baseInput,
            "px-4 py-2.5 cursor-pointer appearance-none bg-no-repeat bg-[length:16px] bg-[right_12px_center]",
            "pr-10",
            error && "border-err focus:border-err"
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237d8aab'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          }}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-err text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
