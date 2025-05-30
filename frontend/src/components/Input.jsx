import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  error,
  fullWidth = true,
  className = "",
  type = "text",
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const inputClasses = `block w-full px-3 py-2 bg-white dark:bg-gray-800 border ${
    error
      ? "border-red-500 dark:border-red-400"
      : isFocused
      ? "border-blue-500 dark:border-blue-400"
      : "border-gray-300 dark:border-gray-600"
  } rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${
    error
      ? "focus:ring-red-500 dark:focus:ring-red-400"
      : "focus:ring-blue-500 dark:focus:ring-blue-400"
  } focus:ring-opacity-50 transition-all duration-200 text-gray-900 dark:text-white`;

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={`relative ${widthClass} ${className}`}>
      <div className="relative">
        <label className="text-white mb-2 block" htmlFor={label}>
          {label}
        </label>
        <input
          id={props.id || props.name}
          type={inputType}
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
