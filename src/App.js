import {useEffect, useRef, useState} from "react";

const App = () => {
    const [sessionLength, setSessionLength] = useState(0.1);
    const [breakLength, setBreakLength] = useState(0.1)
    const [countdownTime, setCountdownTime] = useState(sessionLength * 60)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [workTime, setWorkTime] = useState(true)
    const timerRef = useRef(null)

    const calcDisplayTime = () => {
        let minutes = String(Math.floor(countdownTime / 60))
        let seconds = String(countdownTime % 60)

        if (minutes.length === 1) minutes = '0' + minutes
        if (seconds.length === 1) seconds = '0' + seconds

        return minutes + ":" + seconds
    }

    const handleStart = () => {
        setIsTimerRunning(true)
    }

    const changeWorkTime = () => {
        console.log(countdownTime)
        if (countdownTime === 0) {
            setIsTimerRunning(false)
            setWorkTime(!workTime)
            if(workTime) {
                setCountdownTime(sessionLength * 60)
            } else {
                setCountdownTime(breakLength * 60)
            }
            setIsTimerRunning(true)
        }
    }

    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = setTimeout(() => {
                setCountdownTime(countdownTime - 1)
                changeWorkTime()
            }, 1000)
        } else if (!isTimerRunning) {
            return () => clearTimeout(timerRef.current)
        }
    }, [isTimerRunning, countdownTime])

  return (
      <div className="App">
          <p>{workTime ? 'Session' : "Break"}</p>
          <p>{countdownTime}</p>
          <h1>{calcDisplayTime()}</h1>
          <button onClick={handleStart}>Start</button>
      </div>
  )
}

export default App;
