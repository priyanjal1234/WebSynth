import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const AuthLayout = ({ children, title, subtitle }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
            

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="rounded-full bg-blue-600 dark:bg-blue-500 p-2 text-white">
                            <Code size={24} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">WebSynth AI</span>
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
