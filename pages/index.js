import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import Message from '../components/Message'
import SwitchMode from '../components/SwitchMode'
import Timer from '../components/Timer'

let runningTimer
let pomodoroDuration = 25 * 60
let shortBreakDuration = 5 * 60
let longBreakDuration = 15 * 60

export default function Home() {
    const [activeKey, setActiveKey] = useState(1)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState('Pomodoro')

    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(pomodoroDuration)
    const [isOver, setIsOver] = useState(false)

    const audioElement = useRef(null)

    function playAudio() {
        audioElement.current.play()
    }

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
                        setTimeLeft(pomodoroDuration)
                    }
                })
            }, 1000)
        }

        if (isActive) {
            startTimer()
            setIsOver(false)
        }
        if (isOver) {
            playAudio()
            clearInterval(runningTimer)
        }
        if (timeLeft && !isActive) {
            setProgress(0)
            clearInterval(runningTimer)
        }
    }, [isActive])

    function clickHandler(key) {
        if (activeKey !== key) {
            setIsActive(false)
            switch (key) {
                case 2:
                    setMode('Short Break')
                    setTimeLeft(shortBreakDuration)
                    break
                case 3:
                    setMode('Long Break')
                    setTimeLeft(longBreakDuration)
                    break
                default:
                    setMode('Pomodoro')
                    setTimeLeft(pomodoroDuration)
            }
        }
        setActiveKey(key)
    }

    return (
        <div className="p-[18px]">
            <audio ref={audioElement} src="./ringtone.mp3" />
            <div className="max-w-[480px] h-[5px] bg-red-300 relative mx-auto  rounded-lg">
                <div
                    className={`progress h-full bg-red-100 absolute rounded-lg`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="max-w-[480px] mx-auto mt-5">
                <div className="flex flex-col p-[18px] rounded-lg bg-red-300/30 gap-y-10">
                    <SwitchMode
                        activeKey={activeKey}
                        clickHandler={clickHandler}
                    />
                    <Timer timeLeft={timeLeft} />
                    <Button isActive={isActive} setIsActive={setIsActive} />
                </div>
                <Message timerType={mode} />
            </div>
        </div>
    )
}
