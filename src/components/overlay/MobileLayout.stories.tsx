import type { Meta, StoryObj } from '@storybook/react-vite'
import MobileLayout from './MobileLayout'

const meta: Meta<typeof MobileLayout> = {
  title: 'Overlay/MobileLayout',
  component: MobileLayout,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        component:
          'The full mobile (≤768px) layout: welcome headline + bio paragraphs at top, then a vertical stack of the four app cards.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MobileLayout>

export const Default: Story = {}

/** Tablet width — verifies the layout still reads well on slightly wider mobile devices. */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
      viewports: {
        responsive: { name: 'Tablet (640)', styles: { width: '640px', height: '900px' } },
      },
    },
  },
}
