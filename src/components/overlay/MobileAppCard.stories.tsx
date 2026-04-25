import type { Meta, StoryObj } from '@storybook/react-vite'
import MobileAppCard from './MobileAppCard'
import apps from '../../data/apps'

const meta: Meta<typeof MobileAppCard> = {
  title: 'Overlay/MobileAppCard',
  component: MobileAppCard,
  argTypes: {
    app: {
      control: { type: 'select' },
      options: apps.map((a) => a.name),
      mapping: Object.fromEntries(apps.map((a) => [a.name, a])),
    },
    forceComingSoon: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          padding: '64px 24px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MobileAppCard>

/** A linked card. Tap to open the destination in a new tab. */
export const Linked: Story = {
  args: { app: apps.find((a) => a.name === 'Regibee')!, forceComingSoon: false },
}

/** A coming-soon card. Tap to trigger the overlay (it will auto-revert after 2s). */
export const ComingSoon: Story = {
  args: {
    app: apps.find((a) => a.name === 'Piano Pitch')!,
    forceComingSoon: false,
  },
}

/**
 * Coming soon overlay forced visible — useful for design review of the
 * overlay's typography, spark glyph, and animated dots without timing out.
 */
export const ComingSoonOverlayShown: Story = {
  args: {
    app: apps.find((a) => a.name === 'Instant Search')!,
    forceComingSoon: true,
  },
}

/** All four cards stacked, mirroring the production layout. */
export const AllCards: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {apps.map((app) => (
        <MobileAppCard key={app.name} app={app} />
      ))}
    </div>
  ),
}
