export interface AppData {
  name: string
  description: string
  /** When null, the card shows a "Coming soon" overlay on click. */
  href: string | null
  position: [number, number, number]
  color: string
}

const apps: AppData[] = [
  {
    name: 'Regibee',
    description: 'The everything registry that makes gift giving simple',
    href: 'https://regibee.com',
    position: [-2.8, 1.5, -1.0],
    color: '#f6c554',
  },
  {
    name: 'Second Guess',
    description: "Real-time party game where you don't want to be #1",
    href: 'https://secondguess.byebrianwong.com',
    position: [1.7, 1.4, -1.6],
    color: '#ff8fa3',
  },
  {
    name: 'Piano Pitch',
    description: 'Relative pitch training game',
    href: null,
    position: [1.5, -1.4, -0.7],
    color: '#7eb8ff',
  },
  {
    name: 'Instant Search',
    description: 'Keep inflow with inline browser AI descriptions',
    href: null,
    position: [-1.0, -1.7, -0.5],
    color: '#a8e6a3',
  },
]

export default apps
