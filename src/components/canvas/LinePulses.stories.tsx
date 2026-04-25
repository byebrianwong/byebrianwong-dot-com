import { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as THREE from 'three'
import { CanvasStage } from '../../../.storybook/decorators'
import LinePulses from './LinePulses'
import ConstellationLines from './ConstellationLines'
import StarField from './StarField'
import apps from '../../data/apps'
import { spawnPulse } from '../../state/pulses'

const ORB_Y = 0.5
const ORB_POSITIONS = apps.map(
  (a) => new THREE.Vector3(a.position[0], a.position[1] + ORB_Y, a.position[2]),
)

interface PulseDriverProps {
  /** Index of the orb pulses originate from. */
  fromIndex?: number
  /** Milliseconds between pulse waves. */
  intervalMs?: number
  /** Travel duration per pulse. */
  travelMs?: number
}

/** Spawns a fresh wave of pulses on a fixed cadence so the story stays alive. */
function PulseDriver({
  fromIndex = 0,
  intervalMs = 850,
  travelMs = 750,
}: PulseDriverProps) {
  useEffect(() => {
    const fire = () => {
      const src = apps[fromIndex]
      const from = ORB_POSITIONS[fromIndex]
      const now = performance.now()
      for (let j = 0; j < apps.length; j++) {
        if (j === fromIndex) continue
        spawnPulse({
          from: from.clone(),
          to: ORB_POSITIONS[j].clone(),
          color: src.color,
          fromIndex,
          toIndex: j,
          startMs: now,
          durationMs: travelMs,
        })
      }
    }
    fire()
    const id = window.setInterval(fire, intervalMs)
    return () => window.clearInterval(id)
  }, [fromIndex, intervalMs, travelMs])
  return null
}

const meta: Meta<typeof PulseDriver> = {
  title: '3D/LinePulses',
  component: PulseDriver,
  parameters: {
    docs: {
      description: {
        component:
          'Light packets traveling between orbs. Spawned by FloatingCard on hover in production; this story drives them on a fixed cadence so you can study the pulse appearance, easing, and bloom interaction in isolation.',
      },
    },
  },
  argTypes: {
    fromIndex: {
      control: { type: 'select' },
      options: apps.map((_, i) => i),
      labels: Object.fromEntries(apps.map((a, i) => [i, a.name])),
    },
    intervalMs: { control: { type: 'range', min: 300, max: 2000, step: 50 } },
    travelMs: { control: { type: 'range', min: 200, max: 2000, step: 50 } },
  },
  args: { fromIndex: 0, intervalMs: 850, travelMs: 750 },
  render: (args) => (
    <CanvasStage>
      <StarField reducedMotion={false} />
      <ConstellationLines reducedMotion={false} />
      {apps.map((app, i) => (
        <mesh key={app.name} position={ORB_POSITIONS[i]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshBasicMaterial color={app.color} toneMapped={false} />
        </mesh>
      ))}
      <LinePulses />
      <PulseDriver {...args} />
    </CanvasStage>
  ),
}

export default meta
type Story = StoryObj<typeof PulseDriver>

/** Pulses originating from Regibee (top-left, yellow). */
export const FromRegibee: Story = { args: { fromIndex: 0 } }

/** Pulses originating from Second Guess (top-right, rose). */
export const FromSecondGuess: Story = { args: { fromIndex: 1 } }

/** Pulses originating from Piano Pitch (bottom-right, blue). */
export const FromPianoPitch: Story = { args: { fromIndex: 2 } }

/** Pulses originating from Instant Search (bottom-left, green). */
export const FromInstantSearch: Story = { args: { fromIndex: 3 } }

/** Slow, deliberate pulses for design review. */
export const SlowMotion: Story = {
  args: { intervalMs: 1500, travelMs: 1500 },
}
