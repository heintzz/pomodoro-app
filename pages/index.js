import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../components/Button'
import Setting from '../components/Setting'
import Message from '../components/Message'
import SwitchMode from '../components/SwitchMode'
import Timer from '../components/Timer'

import nookies, { destroyCookie } from 'nookies'
import axiosPrivate from '../axios'

let mode = 'pomodoroDuration'
let runningTimer

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  if (!cookies?.refreshToken) {
    return {
      redirect: {
        destination: '/login',
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.tokenState.accessToken)
  const settings = useSelector((state) => state.timerState)

  const [activeMode, setActiveMode] = useState('Pomodoro')
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroDuration * 60)
  const [isOver, setIsOver] = useState(false)
  const [repetition, setRepetition] = useState(1)

  const audioElement = useRef(null)

  function playAudio() {
    audioElement.current.play()
  }

  useEffect(() => {
    async function getTimerSetting() {
      const res = await axiosPrivate.get('/timer', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      dispatch({ type: 'UPDATE_TIMER', payload: res.data })
      if (res.status === 200)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
    }
    getTimerSetting()
  }, [])

  useEffect(() => {
    function startTimer() {
      runningTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== 0) {
            setProgress((prev) => prev + 100 / timeLeft)
            return prev - 1
          } else {
            setProgress(0)
            setIsOver(true)
            setIsActive(false)
            switchMode(activeMode)
          }
        })
      }, 1000)
    }

    if (isActive) {
      startTimer()
      setIsOver(false)
    } else {
      if (isOver) {
        playAudio()
        if (activeMode === 'Pomodoro') {
          setRepetition((prev) => prev + 1)
          if (repetition % 9 === 0) {
            switchMode('Long Break')
            setRepetition(1)
          } else if (repetition % 3 === 0) switchMode('Short Break')
        }
      }
      if (!timeLeft) {
        setProgress(0)
      }
      clearInterval(runningTimer)
    }
  }, [isActive])

  useEffect(() => {
    check()
    setTimeLeft(settings[mode] * 60)
  }, [settings])

  function switchMode(mode) {
    switch (mode) {
      case 'Short Break':
        setActiveMode('Short Break')
        setTimeLeft(settings.shortBreakDuration * 60)
        break
      case 'Long Break':
        setActiveMode('Long Break')
        setTimeLeft(settings.longBreakDuration * 60)
        break
      default:
        setActiveMode('Pomodoro')
        setTimeLeft(settings.pomodoroDuration * 60)
    }
  }

  function clickHandler(mode) {
    if (mode !== activeMode) {
      setIsActive(false)
      switchMode(mode)
    }
    setActiveMode(mode)
  }

  function check() {
    if (activeMode === 'Pomodoro') {
      mode = 'pomodoroDuration'
    } else if (activeMode === 'Short Break') {
      mode = 'shortBreakDuration'
    } else {
      mode = 'longBreakDuration'
    }
  }

  function updateTimer(timerSetting) {
    dispatch({ type: 'UPDATE_TIMER', payload: timerSetting })
    async function updateTimerDB() {
      const res = await axiosPrivate.post('/timer', timerSetting, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    }

    updateTimerDB()
  }

  async function logout() {
    const res = await axiosPrivate.get('/auth/logout')
    if (res.status === 200) {
      router.replace('/login')
    }
  }

  return (
    <>
      <div className="bg-[#ca5652] text-white flex flex-col justify-center items-center w-screen h-screen p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <audio ref={audioElement} src="./ringtone.mp3" />
            <div className="flex mb-5 justify-between max-w-[480px] ">
              <p>Pomodoro</p>
              <div className="flex gap-x-2">
                <button className="bg-white text-[#ca5652] px-2 py-[1px] rounded-md">Setting</button>
                <button className="bg-white text-[#ca5652] px-2 py-[1px] rounded-md" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="max-w-[480px] h-[5px] bg-red-300 relative rounded-lg">
              <div className={`progress h-full bg-red-100 absolute rounded-lg`} style={{ width: `${progress}%` }}></div>
            </div>
            <div className="max-w-[480px] mt-5">
              <div className="flex flex-col p-[18px] rounded-lg bg-red-300/30 gap-y-10">
                <SwitchMode activeMode={activeMode} clickHandler={clickHandler} />
                <Timer timeLeft={timeLeft} />
                <Button isActive={isActive} setIsActive={setIsActive} />
              </div>
              <Message timerType={activeMode} repetition={repetition} />
            </div>
            {/* <Setting settings={settings} updateTimer={updateTimer} /> */}
          </div>
        )}
      </div>
    </>
  )
}
