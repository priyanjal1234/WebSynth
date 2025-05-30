import React from 'react';

const Checkbox = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex items-start ${className}`}>
            <div className="flex items-center h-5">
                <input
                    type="checkbox"
                    className={`h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 ${
                        error ? 'border-red-500 dark:border-red-400' : ''
                    }`}
                    {...props}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor={props.id || props.name} className="text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                {error && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>
        </div>
    );
};

export default Checkbox;
