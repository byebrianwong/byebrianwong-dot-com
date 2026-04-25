import type { Meta, StoryObj } from '@storybook/react-vite'
import { CanvasStage } from '../../../.storybook/decorators'
import StarField from './StarField'
import Particles from './Particles'

const meta: Meta<typeof StarField> = {
  title: '3D/StarField',
  component: StarField,
  parameters: {
    docs: {
      description: {
        component:
          '600 distant stars rendered on a sphere shell behind everything. Fades in over 600ms on mount. Skips the fade when reducedMotion is on.',
      },
    },
  },
  argTypes: {
    reducedMotion: { control: 'boolean' },
  },
  args: { reducedMotion: false },
  render: (args) => (
    <CanvasStage>
      <StarField {...args} />
    </CanvasStage>
  ),
}

export default meta
type Story = StoryObj<typeof StarField>

/** Stars only. */
export const Default: Story = {}

/** With reduced-motion: stars are present at full opacity, no fade-in. */
export const ReducedMotion: Story = {
  args: { reducedMotion: true },
}

/** Stars + foreground particle drift, like the production background stack. */
export const WithDriftingParticles: Story = {
  render: (args) => (
    <CanvasStage>
      <StarField {...args} />
      <Particles reducedMotion={args.reducedMotion ?? false} />
    </CanvasStage>
  ),
}
