import React from 'react'

export default function Clock({ timer, duration }) {
  switch (timer) {
    case 'Pomodoro':
      return (
        <div className="flex gap-x-2 text-8xl text-white justify-center font-semibold">
          <span className="minutes">
            {duration / 60 > 9
              ? Math.floor(duration / 60)
              : '0' + Math.floor(duration / 60)}
          </span>
          <span>:</span>
          <span className="seconds">
            {duration % 60 > 9 ? duration % 60 : '0' + (duration % 60)}
          </span>
        </div>
      )
    case 'Short Break':
      return (
        <div className="flex gap-x-2 text-8xl text-white justify-center font-semibold">
          <span className="minutes">05</span>
          <span>:</span>
          <span className="seconds">00</span>
        </div>
      )
    case 'Long Break':
      return (
        <div className="flex gap-x-2 text-8xl text-white justify-center font-semibold">
          <span className="minutes">15</span>
          <span>:</span>
          <span className="seconds">00</span>
        </div>
      )
  }
}
