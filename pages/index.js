import { useEffect, useRef, useState } from 'react'
import Message from '../components/Message'
import Timer from '../components/Timer'

let runningTimer

export default function Home() {
  const [activeKey, setActiveKey] = useState(1)
  const [isActive, setIsActive] = useState(false)
  const [activeTimer, setActiveTimer] = useState('Pomodoro')

  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(25 * 60)
  const [timeLeft, setTimeLeft] = useState(duration)

  const audioElement = useRef(null)

  function playAudio() {
    audioElement.current.play()
  }

  useEffect(() => {
    function startTimer() {
      runningTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev !== 100) {
            return prev + 100 / duration
          } else {
            setIsActive(false)
            setProgress(0)
          }
        })

        setTimeLeft((prev) => {
          if (prev !== 0) {
            return prev - 1
          } else {
            setIsActive(false)
            setProgress(0)
            setTimeLeft(duration)
          }
        })
      }, 1000)
    }

    if (isActive) {
      startTimer()
    } else {
      clearInterval(runningTimer)
      playAudio()
    }
  }, [isActive])

  function clickHandler(key) {
    if (activeKey !== key) {
      setIsActive(false)
      setProgress(0)

      if (key == 1) {
        setActiveTimer('Pomodoro')
        setDuration(25 * 60)
        setTimeLeft(25 * 60)
      } else if (key == 2) {
        setActiveTimer('Short Break')
        setDuration(5 * 60)
        setTimeLeft(5 * 60)
      } else {
        setActiveTimer('Long Break')
        setDuration(15 * 60)
        setTimeLeft(15 * 60)
      }
    }

    setActiveKey(key)
  }

  return (
    <div className="p-[18px] w-screen">
      <audio ref={audioElement} src="./ringtone.mp3" />
      <div
        className={`max-w-[480px] h-[10px] relative mx-auto ${
          progress !== 100 && 'bg-red-900/30'
        } rounded-md`}
      >
        <div
          className={`progress h-full bg-red-100 absolute rounded-md`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="max-w-[480px] mx-auto mt-5">
        <div className="flex flex-col p-[18px] rounded-lg bg-red-300/30 gap-y-10">
          <div className="flex gap-x-5 justify-center text-white">
            <p
              key={1}
              className={`px-3 py-2 cursor-pointer ${
                1 == activeKey && 'active-window'
              }`}
              onClick={() => clickHandler(1)}
            >
              Pomodoro
            </p>
            <p
              key={2}
              className={`px-3 py-2 cursor-pointer ${
                2 == activeKey && 'active-window'
              }`}
              onClick={() => clickHandler(2)}
            >
              Short Break
            </p>
            <p
              key={3}
              className={`px-3 py-2 cursor-pointer ${
                3 == activeKey && 'active-window'
              }`}
              onClick={() => clickHandler(3)}
            >
              Long Break
            </p>
          </div>
          <Timer timeLeft={timeLeft} />
          <button
            onClick={() => setIsActive((prev) => !prev)}
            className="bg-white py-3 px-8 w-[150px] rounded-md mx-auto text-xl font-semibold tracking-wider text-[#ca5652] shadow-[inset_0_-2px_6px_rgba(189,195,199,1)]"
          >
            {isActive ? 'PAUSE' : 'START'}
          </button>
        </div>
        <Message timerType={activeTimer} />
      </div>
    </div>
  )
}
