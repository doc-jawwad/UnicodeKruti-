type Network =
  | 'instagram'
  | 'youtube'
  | 'x'
  | 'pinterest'
  | 'medium'
  | 'reddit'
  | 'quora';

export default function SocialIcon({ network }: { network: Network }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
  };

  switch (network) {
    case 'instagram':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      );
    case 'x':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.54 1.9 1.84 0 3.08-2.37 3.08-5.18 0-2.14-1.44-3.75-4.05-3.75-2.95 0-4.79 2.21-4.79 4.67 0 .85.25 1.45.64 1.92.18.21.21.29.14.54-.05.17-.16.58-.2.74-.07.27-.28.37-.52.27-1.43-.59-2.1-2.17-2.1-3.95 0-2.93 2.48-6.46 7.38-6.46 3.95 0 6.54 2.87 6.54 5.95 0 4.09-2.26 7.14-5.6 7.14-1.12 0-2.18-.6-2.54-1.28l-.7 2.69c-.26.97-.94 2.19-1.39 2.92.87.26 1.79.4 2.75.4 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      );
    case 'medium':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      );
    case 'reddit':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.38a2.34 2.34 0 0 0-.5 1.43 2.4 2.4 0 0 1-2.4 2.4 2.34 2.34 0 0 1-1.62-.65" />
          <path d="M7.28 11.06A10.94 10.94 0 0 0 5 12.38a2.34 2.34 0 0 1 .5 1.43 2.4 2.4 0 0 0 2.4 2.4 2.34 2.34 0 0 0 1.62-.65" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
    case 'quora':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c1.84 0 3.58-.42 5.13-1.16l1.09 1.64h3.84L19.7 21.7A11.97 11.97 0 0 0 24 12C24 5.373 18.627 0 12 0zm3.16 19.09c-.57-.85-1.22-1.78-1.87-2.56-.5.1-1.01.15-1.55.15-3.76 0-6.39-2.67-6.39-6.68S7.98 3.32 11.74 3.32s6.4 2.67 6.4 6.68c0 2.41-.87 4.39-2.37 5.6.48.62.98 1.29 1.38 1.85l-1.99 1.64z" />
        </svg>
      );
    default:
      return null;
  }
}
