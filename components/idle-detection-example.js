import { useEffect, useState } from "react";

export default function IdleDetectionExample(props) {
    const hasIdleDetector = () => (typeof window !== "undefined") && 'IdleDetector' in window;
    const [isGranted, setIsGranted] = useState(false);
    const [count, setCount] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    
    const grantedClickHandler = async function(){
        const state = await IdleDetector.requestPermission();
        setIsGranted(state === 'granted');
    }
    
    const pausedClickHandler = function() {
        setIsPaused(false);
    }

    useEffect(async () => {
        if (isGranted) {
            try {
                const idleDetector = new IdleDetector();
                idleDetector.addEventListener('change', () => {
                    const userState = idleDetector.userState;
                    const screenState = idleDetector.screenState;
                    if (userState === 'idle' || screenState === 'locked') {
                        setIsPaused(true);
                    }
                });
                await idleDetector.start({
                    threshold: 60000
                });
            } catch (err) {
                console.error(err.name, err.message);
            }
        }
    }, [isGranted]);

    useEffect(() => {
        if (isGranted) {
            if (!isPaused) {
                const interval = setInterval(function(){
                    setCount(c => c + 1);
                }, 1000);
                return () => clearInterval(interval);
            }
        }
    }, [isGranted, isPaused]);

    return (
        <div style={{border: "1px solid grey", borderRadius: "0.3rem", padding: "1rem"}}>
            <p>Idle Detection API support&nbsp;
            { 
                hasIdleDetector() ? <span>&#x2b55;</span>
                    : <span>&#x274C; <small>Please upgrade to Chrome 94 or above to use our service.</small></span>
            }
            </p>
            { 
                hasIdleDetector() && 
                <p>Idle Detection permission granted&nbsp;
                {
                    isGranted ? <span>&#x2b55;</span>
                        : <span onClick={ grantedClickHandler }>&#x274C; <small>Please click here to allow the permission and use our service.</small></span>
                }
                </p>
            }
            {
                isGranted &&
                <p>You have learned for <strong><span>{count}</span></strong> seconds&nbsp;
                {
                    isPaused ? <span onClick={ pausedClickHandler }>&#x274C; <small>Idle Detected! Click here to continue learning.</small></span>
                        : <span>&#x26a0; <small>Idling more than 60s or locking sreen will pause the timer!</small></span>
                }
                </p>
            }
        </div>
    );
}