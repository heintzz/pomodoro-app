import React from 'react'

export default function Separator() {
  return (
    <div className="flex gap-x-5 items-center w-full">
      <div className="w-[45%] h-[1px] bg-slate-400"></div>
      <span className="text-slate-400">or</span>
      <div className="w-[45%] h-[1px] bg-slate-400"></div>
    </div>
  )
}
