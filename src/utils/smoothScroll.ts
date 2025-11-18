import Lenis from "lenis"

let lenisInstance: Lenis | null = null

export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time: number) {
    lenisInstance?.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenisInstance
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export function getLenis() {
  return lenisInstance
}
