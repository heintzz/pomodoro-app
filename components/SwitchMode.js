import React from 'react'

export default function SwitchMode({ activeKey, clickHandler }) {
    return (
        <div className="flex gap-x-5 justify-center text-white">
            {['Pomodoro', 'Short Break', 'Long Break'].map((mode, i) => {
                const key = i + 1
                return (
                    <p
                        key={key}
                        className={`px-3 py-2 cursor-pointer ${
                            key == activeKey && 'active-window'
                        }`}
                        onClick={() => clickHandler(key)}
                    >
                        {mode}
                    </p>
                )
            })}
        </div>
    )
}
