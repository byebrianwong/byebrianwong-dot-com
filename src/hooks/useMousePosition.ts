import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface MouseState {
  /** Normalized device coordinates [-1, 1] */
  ndc: THREE.Vector2
  /** Client pixel position */
  client: { x: number; y: number }
}

const mouse: MouseState = {
  ndc: new THREE.Vector2(0, 0),
  client: { x: 0, y: 0 },
}

let listenerAttached = false

function attach() {
  if (listenerAttached) return
  listenerAttached = true

  const onMove = (e: MouseEvent) => {
    mouse.client.x = e.clientX
    mouse.client.y = e.clientY
    mouse.ndc.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ndc.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('mousemove', onMove, { passive: true })
}

/** Returns a stable ref to the shared mouse state. Read inside useFrame. */
export function useMousePosition() {
  const ref = useRef(mouse)
  useEffect(() => { attach() }, [])
  return ref
}
