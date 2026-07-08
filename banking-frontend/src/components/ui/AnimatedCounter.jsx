import { useEffect, useState, useRef } from 'react'
import { formatCurrency } from '../../utils/validators'

export default function AnimatedCounter({
  value = 0,
  currency = 'INR',
  duration = 1200,
  className = '',
}) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(null)
  const startTimeRef = useRef(null)
  const fromRef = useRef(0)

  useEffect(() => {
    const target = Number(value) || 0
    fromRef.current = display
    startTimeRef.current = null

    function step(timestamp) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = fromRef.current + (target - fromRef.current) * eased
      setDisplay(current)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(target)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return (
    <span className={`tabular-figure ${className}`}>
      {formatCurrency(display, currency)}
    </span>
  )
}
