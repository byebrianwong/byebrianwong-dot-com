export interface AppData {
  name: string
  description: string
  href: string
  position: [number, number, number]
  color: string
}

const apps: AppData[] = [
  {
    name: 'Regibee',
    description: 'The everything registry that makes gift giving simple',
    href: '/apps/regibee',
    position: [-3.2, 0.8, -1],
    color: '#f6c554',
  },
  {
    name: 'Piano Pitch',
    description: 'Relative pitch training game',
    href: '/apps/piano-pitch',
    position: [2.8, 0.5, -1.5],
    color: '#7eb8ff',
  },
  {
    name: 'Instant Search',
    description: 'Keep inflow with inline browser AI descriptions',
    href: '/apps/instant-search',
    position: [-0.3, -1.8, -2],
    color: '#a8e6a3',
  },
]

export default apps
