import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/styles/global.css'
import './preview.css'

const cosmicBackdrop: Decorator = (Story, ctx) => {
  const noBackdrop = ctx.parameters?.cosmicBackdrop === false
  if (noBackdrop) return <Story />
  return (
    <div className="sb-cosmic-backdrop">
      <Story />
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'cosmic',
      values: [
        { name: 'cosmic', value: '#050309' },
        { name: 'pure-black', value: '#000000' },
        { name: 'neutral', value: '#1c1c20' },
      ],
    },
    layout: 'fullscreen',
    a11y: {
      test: 'todo',
    },
  },
  decorators: [cosmicBackdrop],
}

export default preview
