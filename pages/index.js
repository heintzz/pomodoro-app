// DOM JS
// import { useState } from 'react'

// let runningTimer

// export default function Home() {
//   const [isActive, setIsActive] = useState(false)
//   let progress = 0

//   if (isActive) {
//     startTimer()
//   } else {
//     clearInterval(runningTimer)
//   }

//   function startTimer() {
//     runningTimer = setInterval(() => {
//       progress += 1
//       if (progress <= 100) {
//         document
//           .querySelector('.progress')
//           .setAttribute('style', `width:${progress}%`)
//       } else {
//         setIsActive(false)
//       }
//     }, 1000)
//   }

//   return (
//     <div
//       className="w-[500px] h-[20px] border border-black relative mt-10 ml-10"
//       onClick={() => setIsActive(true)}
//     >
//       <div className={`progress h-full bg-red-100 absolute`}></div>
//     </div>
//   )
// }

// REACT
import { useEffect, useState } from 'react'
import Clock from '../components/Clock'

let runningTimer

export default function Home() {
  const [isActive, setIsActive] = useState(false)
  const [activeTimer, setActiveTimer] = useState('Pomodoro')
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(10)

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
        setDuration((prev) => {
          if (prev !== 0) {
            return prev - 1
          } else {
            setIsActive(false)
            setProgress(0)
            setDuration(10)
          }
        })
      }, 1000)
    }

    if (isActive) {
      startTimer()
    } else {
      return clearInterval(runningTimer)
    }
  }, [isActive])

  function clickHandler(e) {
    const activeBtn = document.querySelector('.activeButton')
    const curBtn = e.target

    if (activeBtn.textContent !== curBtn.textContent) {
      activeBtn.classList.remove('activeButton')
      curBtn.classList.add('activeButton')
      setActiveTimer(curBtn.textContent)

      // reset progress bar
      setIsActive(false)
      setProgress(0)
    }
  }

  return (
    <div className="p-[18px] w-screen">
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
              className="activeButton px-3 py-2 cursor-pointer "
              onClick={clickHandler}
            >
              Pomodoro
            </p>
            <p className="px-3 py-2 cursor-pointer" onClick={clickHandler}>
              Short Break
            </p>
            <p className="px-3 py-2 cursor-pointer " onClick={clickHandler}>
              Long Break
            </p>
          </div>
          <Clock
            timer={activeTimer}
            duration={duration}
            setDuration={setDuration}
          />
          <button
            onClick={() => setIsActive((prev) => !prev)}
            className="bg-white py-3 px-8 w-[150px] rounded-md mx-auto text-xl font-semibold tracking-wider text-[#ca5652] shadow-[inset_0_-2px_6px_rgba(189,195,199,1)]"
          >
            {isActive ? 'PAUSE' : 'START'}
          </button>
        </div>
        <div className="text-center text-white mt-10">
          <p className="text-white/80 tracking-wider">Time to Focus!</p>
        </div>
      </div>
    </div>
  )
}
