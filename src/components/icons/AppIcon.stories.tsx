import type { Meta, StoryObj } from '@storybook/react-vite'
import AppIcon from './AppIcon'
import apps from '../../data/apps'

const meta: Meta<typeof AppIcon> = {
  title: 'Icons/AppIcon',
  component: AppIcon,
  argTypes: {
    name: {
      control: 'select',
      options: apps.map((a) => a.name),
    },
    size: { control: { type: 'range', min: 12, max: 96, step: 2 } },
  },
  args: { size: 32 },
}

export default meta
type Story = StoryObj<typeof AppIcon>

export const Regibee: Story = {
  args: { name: 'Regibee', size: 48 },
  render: (args) => (
    <Tile color={apps.find((a) => a.name === args.name)!.color}>
      <AppIcon {...args} />
    </Tile>
  ),
}

export const PianoPitch: Story = {
  args: { name: 'Piano Pitch', size: 48 },
  render: (args) => (
    <Tile color={apps.find((a) => a.name === args.name)!.color}>
      <AppIcon {...args} />
    </Tile>
  ),
}

export const SecondGuess: Story = {
  args: { name: 'Second Guess', size: 48 },
  render: (args) => (
    <Tile color={apps.find((a) => a.name === args.name)!.color}>
      <AppIcon {...args} />
    </Tile>
  ),
}

export const InstantSearch: Story = {
  args: { name: 'Instant Search', size: 48 },
  render: (args) => (
    <Tile color={apps.find((a) => a.name === args.name)!.color}>
      <AppIcon {...args} />
    </Tile>
  ),
}

/** All four icons side-by-side at production size with the production glow. */
export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${apps.length}, 1fr)`,
        gap: 24,
        padding: 64,
        minHeight: '100vh',
        alignContent: 'center',
      }}
    >
      {apps.map((app) => (
        <Tile key={app.name} color={app.color} label={app.name}>
          <AppIcon name={app.name} size={56} />
        </Tile>
      ))}
    </div>
  ),
}

/** Same icon at every size from 16 → 96 to spot-check legibility. */
export const SizeLadder: Story = {
  args: { name: 'Regibee' },
  argTypes: { size: { control: false } },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'flex-end',
        padding: 64,
        minHeight: '100vh',
      }}
    >
      {[16, 24, 32, 48, 64, 96].map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: '#f0eef6',
            opacity: 0.7,
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
          }}
        >
          <Tile color={apps.find((a) => a.name === args.name)!.color}>
            <AppIcon name={args.name} size={size} />
          </Tile>
          {size}px
        </div>
      ))}
    </div>
  ),
}

function Tile({
  children,
  color,
  label,
}: {
  children: React.ReactNode
  color: string
  label?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        padding: 28,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        color,
        filter: `drop-shadow(0 0 8px ${color}80)`,
      }}
    >
      {children}
      {label && (
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            color: '#f0eef6',
            opacity: 0.85,
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}
