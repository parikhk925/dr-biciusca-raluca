const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" as const };

/** Renders a service icon by key. Unknown or missing keys fall back to a
 * generic medical icon so services without a matching icon still look
 * intentional rather than broken. */
export function ServiceIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case "tooth":
      return (
        <svg {...common}>
          <path d="M12 3c-2.2 0-3.5 1.3-4.8 1.3S4.9 3.2 3.6 4c-1.6 1-1.9 3.9-1.2 6.8.8 3.4 2.6 8.7 4.3 8.7 1.4 0 1.6-2.6 3-2.6s1.7 2.6 3 2.6c1.8 0 3.6-5.5 4.3-8.7.7-2.9.4-5.8-1.2-6.8C14.3 3.2 13.2 4.3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "braces":
      return (
        <svg {...common}>
          <path d="M4 9c0-2.8 3.6-5 8-5s8 2.2 8 5-3.6 5-8 5-8-2.2-8-5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 11.5 7 17c.2 1.5 1.6 2.5 3 2.2M17.5 11.5 17 17c-.2 1.5-1.6 2.5-3 2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "root-canal":
      return (
        <svg {...common}>
          <path d="M9 3h6l1 6-3 3v9h-2v-9L8 9l1-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "xray":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 9c1.5 2 2.5-2 4 0s2.5-2 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "cleaning":
      return (
        <svg {...common}>
          <path d="M5 4h9l5 5v11H5V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "whitening":
      return (
        <svg {...common}>
          <path d="M12 3v3M5 6l2 2M19 6l-2 2M4 13h3M17 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 21c0-4.4 1.8-8 4-8s4 3.6 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "surgery":
      return (
        <svg {...common}>
          <path d="M6 4c2 0 3 1.5 3 3.5S8 12 6 12s-3-2-3-4.5S4 4 6 4Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 8l10 10-2 2L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path d="M4 18h16l-1.5-9-4 3-2.5-6-2.5 6-4-3L4 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "stethoscope":
      return (
        <svg {...common}>
          <path d="M6 4v5a4 4 0 0 0 8 0V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 12v-1M10 12v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6 20V10a6 6 0 1 1 12 0v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}
