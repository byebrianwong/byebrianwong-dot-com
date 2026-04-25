import type { Meta, StoryObj } from '@storybook/react-vite'
import { CanvasStage } from '../../../.storybook/decorators'
import ConstellationLines from './ConstellationLines'
import StarField from './StarField'

const meta: Meta<typeof ConstellationLines> = {
  title: '3D/ConstellationLines',
  component: ConstellationLines,
  parameters: {
    docs: {
      description: {
        component:
          'Closed-quad line geometry connecting the four orb positions. Fades in 1.2s after mount, then breathes in opacity at ~0.6Hz.',
      },
    },
  },
  argTypes: {
    reducedMotion: { control: 'boolean' },
  },
  args: { reducedMotion: false },
  render: (args) => (
    <CanvasStage>
      <StarField reducedMotion={false} />
      <ConstellationLines {...args} />
    </CanvasStage>
  ),
}

export default meta
type Story = StoryObj<typeof ConstellationLines>

export const Default: Story = {}

export const ReducedMotion: Story = {
  args: { reducedMotion: true },
}
