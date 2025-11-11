'use client'
 
import { useEffect } from 'react'
import cstyles from "./common.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <section className={cstyles.section}>
      <h1>Something went wrong!</h1>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </section>
  )
}