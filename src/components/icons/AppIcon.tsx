interface Props {
  name: string
  size?: number
}

const COMMON_PROPS = {
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
} as const

export default function AppIcon({ name, size = 20 }: Props) {
  switch (name) {
    case 'Regibee':
      return (
        <svg
          {...COMMON_PROPS}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path
            d="M10 3.6 Q9 1.4 11 1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle
            cx="10"
            cy="11.5"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="7.6" cy="10.5" r="0.95" fill="currentColor" />
          <circle cx="12.4" cy="10.5" r="0.95" fill="currentColor" />
          <path
            d="M7.7 13.5 Q10 15 12.3 13.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'Piano Pitch':
      return (
        <svg
          {...COMMON_PROPS}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <line
            x1="9.2"
            y1="14"
            x2="9.2"
            y2="2.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.2 2.6 Q14 4.2 13.4 9.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse
            cx="6.6"
            cy="14.6"
            rx="2.9"
            ry="2.1"
            fill="currentColor"
            transform="rotate(-18 6.6 14.6)"
          />
        </svg>
      )
    case 'Second Guess':
      return (
        <svg
          {...COMMON_PROPS}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path
            d="M6 2 L8.4 7.8 M14 2 L11.6 7.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle
            cx="10"
            cy="13"
            r="5.2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <text
            x="10"
            y="15.5"
            textAnchor="middle"
            fontSize="6.4"
            fontWeight={700}
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            2
          </text>
        </svg>
      )
    case 'Do Done':
      return (
        <svg
          {...COMMON_PROPS}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <rect
            x="2.8"
            y="2.8"
            width="14.4"
            height="14.4"
            rx="2.6"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M6.2 10.4 L9 13.1 L13.9 7.3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'Pet Journal':
      return (
        <svg
          {...COMMON_PROPS}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden
        >
          {/* Main paw pad */}
          <ellipse cx="10" cy="14" rx="3.7" ry="3" fill="currentColor" />
          {/* Inner toe pads */}
          <ellipse cx="6" cy="8.6" rx="1.4" ry="1.9" fill="currentColor" />
          <ellipse cx="14" cy="8.6" rx="1.4" ry="1.9" fill="currentColor" />
          {/* Outer toe pads */}
          <ellipse
            cx="2.9"
            cy="11.4"
            rx="1.15"
            ry="1.55"
            fill="currentColor"
            transform="rotate(-22 2.9 11.4)"
          />
          <ellipse
            cx="17.1"
            cy="11.4"
            rx="1.15"
            ry="1.55"
            fill="currentColor"
            transform="rotate(22 17.1 11.4)"
          />
        </svg>
      )
    case 'Instant Search':
      return (
        <svg
          {...COMMON_PROPS}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <circle
            cx="8.5"
            cy="8.5"
            r="5.4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="12.7"
            y1="12.7"
            x2="17"
            y2="17"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )
    default:
      return null
  }
}
