import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import Bio from '../overlay/Bio'

const meta: Meta<typeof Scene> = {
  title: '3D/Scene',
  component: Scene,
  parameters: {
    docs: {
      description: {
        component:
          'The full production canvas content: starfield, particles, mouse light, constellation lines, pulses, and four floating cards — composed inside the production camera + Bloom pipeline.',
      },
    },
    layout: 'fullscreen',
    cosmicBackdrop: false,
  },
  argTypes: {
    reducedMotion: { control: 'boolean' },
    isMobile: { control: 'boolean' },
  },
  args: { reducedMotion: false, isMobile: false },
}

export default meta
type Story = StoryObj<typeof Scene>

/** Full desktop scene: 4 cards, constellation lines, pulses on hover. */
export const Desktop: Story = {
  render: (args) => (
    <FullStage withBio>
      <Scene {...args} />
    </FullStage>
  ),
}

/**
 * "Mobile" branch of the scene: only background ambience renders here
 * (no cards or lines). On the live site, the MobileLayout DOM cards
 * sit on top of this canvas.
 */
export const MobileBackground: Story = {
  args: { isMobile: true },
  render: (args) => (
    <FullStage>
      <Scene {...args} />
    </FullStage>
  ),
}

export const ReducedMotion: Story = {
  args: { reducedMotion: true },
  render: (args) => (
    <FullStage withBio>
      <Scene {...args} />
    </FullStage>
  ),
}

function FullStage({
  children,
  withBio = false,
}: {
  children: React.ReactNode
  withBio?: boolean
}) {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background:
            'radial-gradient(ellipse at 50% 45%, #1a1230 0%, #0c0a1c 38%, #050309 80%)',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
      >
        {children}
      </Canvas>
      {withBio && <Bio />}
    </>
  )
}
