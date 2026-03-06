export function ZakatLogo({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.2" />
            <rect x="4" y="4" width="16" height="16" rx="2" transform="rotate(45 12 12)" fill="currentColor" fillOpacity="0.2" />
            <rect x="6" y="6" width="12" height="12" rx="1" />
            <rect x="6" y="6" width="12" height="12" rx="1" transform="rotate(45 12 12)" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    )
}

export function SyariahBadge({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.1" />
            <path d="M9 12l2 2 4-4" strokeWidth="3" />
        </svg>
    )
}
