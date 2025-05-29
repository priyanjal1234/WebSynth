import React, { useState, useEffect } from 'react';

const CodeTypingEffect = ({ code, typingSpeed = 30 }) => {
    const [displayedCode, setDisplayedCode] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < code.length) {
            const timeout = setTimeout(() => {
                setDisplayedCode(prev => prev + code[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, typingSpeed);
            
            return () => clearTimeout(timeout);
        }
    }, [code, currentIndex, typingSpeed]);
    
    // Syntax highlighting function (basic)
    const highlightSyntax = (text) => {
        // Replace keywords, strings, comments, etc.
        return text
            .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>') // comments
            .replace(/(".*?")/g, '<span class="text-yellow-300">$1</span>') // strings
            .replace(/\b(import|export|from|function|return|const|let|var|if|else|for|while)\b/g, '<span class="text-purple-400">$1</span>') // keywords
            .replace(/\b(React|useState|useEffect)\b/g, '<span class="text-cyan-300">$1</span>') // React
            .replace(/\b(className)\b/g, '<span class="text-indigo-300">$1</span>') // JSX attributes
            .replace(/(&lt;\/?\w+(&gt;)?)/g, '<span class="text-blue-400">$1</span>'); // JSX tags
    };

    const sanitizeHtml = (html) => {
        return html
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    const formattedCode = highlightSyntax(sanitizeHtml(displayedCode));

    return (
        <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            <code dangerouslySetInnerHTML={{ __html: formattedCode }} />
            <span className="inline-block h-5 w-2 bg-indigo-400 animate-blink"></span>
        </pre>
    );
};

export default CodeTypingEffect;
