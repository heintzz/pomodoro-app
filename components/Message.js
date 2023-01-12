import React from 'react'

export default function Message({ timerType, repetition }) {
    return (
        <div className="text-center text-white mt-5">
            <p className="mb-4">#{repetition - 1}</p>
            <p className="text-white/80 tracking-wider">
                {timerType === 'Pomodoro' ? 'Time to Focus!' : 'Time to Break'}
            </p>
        </div>
    )
}
