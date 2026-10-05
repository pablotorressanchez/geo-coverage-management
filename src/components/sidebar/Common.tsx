import type React from "react";

interface SidebarItemEl {
    parent?: boolean;
    displayText: string;
    className?: string;
    elementStar?: React.ReactElement;
    elementEnd?: React.ReactElement;
    deep?: number;
    onClick?: () => void;
}

export const TitleList = ({ className = '', displayText, parent = false, elementStar, elementEnd }: SidebarItemEl) => {
    return (
        <div className={`flex items-center justify-between px-3 gap-2 py-1.5 font-normal rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white pb-2 w-full ${className} cursor-pointer`}>
            {elementStar}
            <span className={`flex ${parent? 'font-medium': 'font-normal'} whitespace-nowrap w-full`}>
            {displayText}
            </span>
            {elementEnd}
        </div>
    )
}

export const ItemList = ({ className = '', deep = 0, displayText, parent = false, elementStar,  elementEnd, onClick }: SidebarItemEl) => {
    return (
        <li onClick={ onClick }
            className={`${className} flex items-center ${deep === 1? 'pl-8': ''} px-3 gap-2 py-1.5 font-normal rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white cursor-pointer`}>
            {elementStar}
            <span className={`flex ${parent? 'font-medium': 'font-normal'} whitespace-nowrap w-full duration-400 delay-400`}>
            {displayText}
            </span>
            {elementEnd}
        </li>
    )
}

export const ListGroup = ({ className = '', deep = 1, collapsed = false, children }: { deep?: number, collapsed?: boolean, children: React.ReactElement[], className?: string }) => {
    return (
        <ul className={`duration-400 delay-400 ${deep === 0 ? 'px-3 py-4': (deep === 1? 'py-2': '')} space-y-2 overflow-x-hidden tw-h-full ${collapsed ? 'block': 'hidden'} ${className}`}>
            {children}
        </ul>
    )
}

export const SpanEnd = ({ displayText }: Pick<SidebarItemEl, 'displayText'>) => {
    return (
        <span className="inline-flex items-center justify-center h-6 ms-2 px-1.5 py-0.5 text-xs font-medium text-sky-700 bg-sky-50 dark:bg-sky-300 border border-sky-700 rounded-lg">
            {displayText}
        </span>
    )
}
