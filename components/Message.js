import React from 'react'

export default function Message({ timerType }) {
  return (
    <div className="text-center text-white mt-10">
      <p className="text-white/80 tracking-wider">
        {timerType === 'Pomodoro' ? 'Time to Focus!' : 'Time to Break'}
      </p>
    </div>
  )
}
