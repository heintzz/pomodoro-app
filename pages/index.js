import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import Message from '../components/Message'
import SwitchMode from '../components/SwitchMode'
import Timer from '../components/Timer'
import nookies, { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Setting from '../components/Setting'

let mode = 'pomodoroDuration'
let runningTimer

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)

    if (!cookies?.jwt) {
        return {
            redirect: {
                destination: '/login',
            },
        }
    }

    const res = await axios.get('http://localhost:3500/timer', {
        headers: {
            Authorization: `Bearer ${cookies?.jwt}`,
        },
    })

    const settings = res.data

    return {
        props: {
            cookies,
            ...settings,
        },
    }
}

export default function Home(props) {
    const router = useRouter()
    const dispatch = useDispatch()

    const token = props.cookies.jwt
    const settings = useSelector((state) => state.timerState)

    const [activeMode, setActiveMode] = useState('Pomodoro')
    const [isActive, setIsActive] = useState(false)

    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(settings.pomodoroDuration * 60)
    const [isOver, setIsOver] = useState(false)

    const audioElement = useRef(null)

    function playAudio() {
        audioElement.current.play()
    }

    useEffect(() => {
        dispatch({ type: 'UPDATE_TIMER', payload: props })
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
            const res = await axios.post(
                'http://localhost:3500/timer',
                timerSetting,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
        }

        updateTimerDB()
    }

    function logout() {
        destroyCookie(null, 'jwt')
        router.replace('/login')
    }

    return (
        <>
            <div className="bg-[#ca5652] w-screen h-screen p-4">
                <audio ref={audioElement} src="./ringtone.mp3" />
                <div className="max-w-[480px] h-[5px] bg-red-300 relative mx-auto rounded-lg">
                    <div
                        className={`progress h-full bg-red-100 absolute rounded-lg`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="max-w-[480px] mx-auto mt-5">
                    <div className="flex flex-col p-[18px] rounded-lg bg-red-300/30 gap-y-10">
                        <SwitchMode
                            activeMode={activeMode}
                            clickHandler={clickHandler}
                        />
                        <Timer timeLeft={timeLeft} />
                        <Button isActive={isActive} setIsActive={setIsActive} />
                    </div>
                    <Message timerType={activeMode} />
                </div>
                <Setting settings={settings} updateTimer={updateTimer} />
            </div>
        </>
    )
}
