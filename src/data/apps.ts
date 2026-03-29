export interface AppData {
  name: string
  description: string
  href: string
  position: [number, number, number]
  color: string
}

const apps: AppData[] = [
  {
    name: 'App One',
    description: 'A short description of your first app',
    href: '/apps/app-one',
    position: [-3.5, 0.8, -1],
    color: '#7eb8ff',
  },
  {
    name: 'App Two',
    description: 'A short description of your second app',
    href: '/apps/app-two',
    position: [3.2, -0.5, -1.5],
    color: '#ffb07e',
  },
  {
    name: 'App Three',
    description: 'A short description of your third app',
    href: '/apps/app-three',
    position: [0.5, -2.2, -2],
    color: '#a8e6a3',
  },
  {
    name: 'App Four',
    description: 'A short description of your fourth app',
    href: '/apps/app-four',
    position: [0, 2.2, -2.5],
    color: '#e6a3d5',
  },
]

export default apps
