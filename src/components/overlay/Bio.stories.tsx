import type { Meta, StoryObj } from '@storybook/react-vite'
import Bio from './Bio'

const meta: Meta<typeof Bio> = {
  title: 'Overlay/Bio',
  component: Bio,
  parameters: {
    docs: {
      description: {
        component:
          'The bottom-left bio overlay shown on the desktop layout. Renders the "Welcome!" headline in Fraunces italic above a two-paragraph bio with dotted-underline links.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Bio>

/** Default — fixed bottom-left bio as it appears on the live desktop site. */
export const Default: Story = {}

/**
 * Wide preview frame to show how the bio sits relative to the surrounding
 * cosmic backdrop. Useful for spacing/positioning checks.
 */
export const InWideViewport: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
}
