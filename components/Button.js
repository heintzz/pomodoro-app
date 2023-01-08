import React from 'react'

export default function Button({ isActive, setIsActive }) {
    return (
        <button
            onClick={() => setIsActive((prev) => !prev)}
            className="bg-white py-3 px-8 w-[150px] rounded-md mx-auto text-xl font-semibold tracking-wider text-[#ca5652] shadow-[inset_0_-2px_6px_rgba(189,195,199,1)]"
        >
            {isActive ? 'PAUSE' : 'START'}
        </button>
    )
}
