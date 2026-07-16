'use client'

import { useEffect, useState } from 'react'

declare global {
  // The Idle Detection API is not yet in TypeScript's DOM lib.
  // eslint-disable-next-line no-var
  var IdleDetector: any
}

export default function IdleDetectionExample() {
  const [supported, setSupported] = useState(false)
  const [isGranted, setIsGranted] = useState(false)
  const [count, setCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // detect support after mount to avoid an SSR/client hydration mismatch
  useEffect(() => {
    setSupported('IdleDetector' in window)
  }, [])

  useEffect(() => {
    if (!isGranted) {
      return
    }
    const start = async () => {
      try {
        const idleDetector = new IdleDetector()
        idleDetector.addEventListener('change', () => {
          const userState = idleDetector.userState
          const screenState = idleDetector.screenState
          if (userState === 'idle' || screenState === 'locked') {
            setIsPaused(true)
          }
        })
        await idleDetector.start({ threshold: 60000 })
      } catch (err) {
        console.error(err)
      }
    }
    start()
  }, [isGranted])

  useEffect(() => {
    if (!isGranted || isPaused) {
      return
    }
    const interval = setInterval(() => setCount(c => c + 1), 1000)
    return () => clearInterval(interval)
  }, [isGranted, isPaused])

  const grantedClickHandler = async () => {
    const state = await IdleDetector.requestPermission()
    setIsGranted(state === 'granted')
  }

  const pausedClickHandler = () => {
    setIsPaused(false)
  }

  return (
    <div className="my-4 rounded-lg border border-slate-300 p-4">
      <p>
        Idle Detection API support&nbsp;
        {supported ? (
          <span>&#x2b55;</span>
        ) : (
          <span>
            &#x274C;{' '}
            <small>Please upgrade to Chrome 94 or above to use our service.</small>
          </span>
        )}
      </p>
      {supported && (
        <p>
          Idle Detection permission granted&nbsp;
          {isGranted ? (
            <span>&#x2b55;</span>
          ) : (
            <span onClick={grantedClickHandler} className="cursor-pointer">
              &#x274C;{' '}
              <small>Please click here to allow the permission and use our service.</small>
            </span>
          )}
        </p>
      )}
      {isGranted && (
        <p>
          You have learned for{' '}
          <strong>
            <span>{count}</span>
          </strong>{' '}
          seconds&nbsp;
          {isPaused ? (
            <span onClick={pausedClickHandler} className="cursor-pointer">
              &#x274C; <small>Idle Detected! Click here to continue learning.</small>
            </span>
          ) : (
            <span>
              &#x26a0; <small>Idling more than 60s or locking sreen will pause the timer!</small>
            </span>
          )}
        </p>
      )}
    </div>
  )
}
