import type { Meta, StoryObj } from '@storybook/react-vite'
import { CanvasStage } from '../../../.storybook/decorators'
import FloatingCard from './FloatingCard'
import StarField from './StarField'
import ConstellationLines from './ConstellationLines'
import LinePulses from './LinePulses'
import apps from '../../data/apps'

const meta: Meta<typeof FloatingCard> = {
  title: '3D/FloatingCard',
  component: FloatingCard,
  parameters: {
    docs: {
      description: {
        component:
          'A floating constellation card: glowing orb, color-coded icon, glassy descriptor card hung beneath. Hover to see scale, ring-ping, light pulses, and color glow. Coming-soon cards (Piano Pitch, Instant Search) show a Fraunces-italic overlay on click instead of navigating.',
      },
    },
  },
  argTypes: {
    app: {
      control: { type: 'select' },
      options: apps.map((a) => a.name),
      mapping: Object.fromEntries(apps.map((a) => [a.name, a])),
    },
    index: { control: { type: 'number', min: 0, max: 3 } },
    reducedMotion: { control: 'boolean' },
  },
  args: {
    app: apps[0],
    index: 0,
    reducedMotion: false,
  },
}

export default meta
type Story = StoryObj<typeof FloatingCard>

/** A single card on its own. Hover it for the full reaction. */
export const Single: Story = {
  render: (args) => (
    <CanvasStage>
      <FloatingCard {...args} />
    </CanvasStage>
  ),
}

/** Reduced motion: card appears immediately at rest, no float bob, no parallax. */
export const ReducedMotion: Story = {
  args: { reducedMotion: true },
  render: (args) => (
    <CanvasStage>
      <FloatingCard {...args} />
    </CanvasStage>
  ),
}

/** Coming soon card (no href). Click to trigger the overlay. */
export const ComingSoon: Story = {
  args: {
    app: apps.find((a) => a.name === 'Piano Pitch')!,
    index: 2,
  },
  render: (args) => (
    <CanvasStage>
      <FloatingCard {...args} />
    </CanvasStage>
  ),
}

/** All four cards in their production positions, with starfield + lines + pulses. */
export const FullConstellation: Story = {
  render: () => (
    <CanvasStage>
      <StarField reducedMotion={false} />
      <ConstellationLines reducedMotion={false} />
      <LinePulses />
      {apps.map((app, i) => (
        <FloatingCard
          key={app.name}
          app={app}
          index={i}
          reducedMotion={false}
        />
      ))}
    </CanvasStage>
  ),
}
