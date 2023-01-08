import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import Message from '../components/Message'
import SwitchMode from '../components/SwitchMode'
import Timer from '../components/Timer'

let runningTimer

export async function getStaticProps() {
    // prepare for getting the props from
    return {
        props: {
            pomodoroDuration: 25 * 60,
            shortBreakDuration: 5 * 60,
            longBreakDuration: 15 * 60,
        },
    }
}

export default function Home(props) {
    const { pomodoroDuration, shortBreakDuration, longBreakDuration } = props

    const [isActive, setIsActive] = useState(false)
    const [activeMode, setActiveMode] = useState('Pomodoro')

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
                        switchMode(activeKey)
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
            if (timeLeft) {
                setProgress(0)
            }
            clearInterval(runningTimer)
        }
    }, [isActive])

    function switchMode(mode) {
        switch (mode) {
            case 'Short Break':
                setActiveMode('Short Break')
                setTimeLeft(shortBreakDuration)
                break
            case 'Long Break':
                setActiveMode('Long Break')
                setTimeLeft(longBreakDuration)
                break
            default:
                setActiveMode('Pomodoro')
                setTimeLeft(pomodoroDuration)
        }
    }

    function clickHandler(mode) {
        if (mode !== activeMode) {
            setIsActive(false)
            switchMode(mode)
        }
        setActiveMode(mode)
    }

    return (
        <div className="p-[18px]">
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
        </div>
    )
}
