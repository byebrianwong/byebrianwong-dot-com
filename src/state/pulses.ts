import * as THREE from 'three'

export interface Pulse {
  id: number
  from: THREE.Vector3
  to: THREE.Vector3
  color: string
  fromIndex: number
  toIndex: number
  startMs: number
  durationMs: number
}

const FLASH_DURATION_MS = 420
const pulses: Pulse[] = []
const flashUntil = new Map<number, number>()
let nextId = 1

export function spawnPulse(p: Omit<Pulse, 'id'>): void {
  pulses.push({ ...p, id: nextId++ })
}

export function getPulses(): Pulse[] {
  return pulses
}

export function removePulseById(id: number): void {
  const i = pulses.findIndex((p) => p.id === id)
  if (i >= 0) pulses.splice(i, 1)
}

export function flashOrb(index: number): void {
  flashUntil.set(index, performance.now() + FLASH_DURATION_MS)
}

/** 0..1, where 1 = just flashed, 0 = no flash */
export function getFlashStrength(index: number): number {
  const until = flashUntil.get(index)
  if (until === undefined) return 0
  const remaining = until - performance.now()
  if (remaining <= 0) return 0
  return Math.max(0, Math.min(1, remaining / FLASH_DURATION_MS))
}
