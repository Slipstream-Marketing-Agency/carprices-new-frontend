"use client"
import { useState } from 'react';

export default function ExpandableText({ content }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <span
                className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}
                dangerouslySetInnerHTML={{ __html: content }} // Render HTML content
            ></span>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-semibold text-blue-500 mt-0 hover:underline focus:outline-none rounded-xl"
            >
                {isExpanded ? 'Show Less' : 'Read More'}
            </button>
        </div>
    );
}
