import React from 'react'

export default function Timer({ timeLeft }) {
  return (
    <div className="flex gap-x-2 text-8xl text-white justify-center font-semibold">
      <span className="minutes">
        {timeLeft / 60 > 9
          ? Math.floor(timeLeft / 60)
          : '0' + Math.floor(timeLeft / 60)}
      </span>
      <span>:</span>
      <span className="seconds">
        {timeLeft % 60 > 9 ? timeLeft % 60 : '0' + (timeLeft % 60)}
      </span>
    </div>
  )
}
