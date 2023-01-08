import React from 'react'

export default function SwitchMode({ activeMode, clickHandler }) {
    return (
        <div className="flex gap-x-5 justify-center text-white">
            {['Pomodoro', 'Short Break', 'Long Break'].map((mode, i) => {
                return (
                    <p
                        key={mode}
                        className={`px-3 py-2 cursor-pointer ${
                            mode === activeMode && ' active-window'
                        }`}
                        onClick={() => clickHandler(mode)}
                    >
                        {mode}
                    </p>
                )
            })}
        </div>
    )
}
