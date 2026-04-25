import type { Meta, StoryObj } from '@storybook/react-vite'
import { CanvasStage } from '../../../.storybook/decorators'
import Particles from './Particles'

const meta: Meta<typeof Particles> = {
  title: '3D/Particles',
  component: Particles,
  parameters: {
    docs: {
      description: {
        component:
          '50 small lavender points drifting slowly through the foreground. Drift halts when reducedMotion is on.',
      },
    },
  },
  argTypes: {
    reducedMotion: { control: 'boolean' },
  },
  args: { reducedMotion: false },
  render: (args) => (
    <CanvasStage>
      <Particles {...args} />
    </CanvasStage>
  ),
}

export default meta
type Story = StoryObj<typeof Particles>

export const Drifting: Story = {}

export const Frozen: Story = {
  args: { reducedMotion: true },
}
