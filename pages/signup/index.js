import Link from 'next/link'
import React from 'react'
import Separator from '../../components/Separator'

const input =
  'w-full bg-slate-100 text-slate-500 p-2 font-light text-md rounded-lg'
const label = 'text-slate-300 tracking-wide'

export default function index() {
  return (
    <div className="p-[18px] w-screen">
      <div className="max-w-[400px] mx-auto">
        <div className="text-center text-white mb-10">
          <h1 className="text-[35px]">Pomodoro</h1>
          <p className="text-white/80 tracking-wider">Create Account</p>
        </div>
        <div className="flex flex-col p-[18px] rounded-lg bg-white gap-y-3">
          <button className="w-full p-2 bg-slate-100 text-slate-500 font-bold text-md rounded-lg">
            Sign up with Google
          </button>
          <Separator />
          <form className="flex flex-col gap-y-3">
            <label htmlFor="email" className={label}>
              EMAIL
            </label>
            <input
              type="text"
              placeholder="example@mail.com"
              id="email"
              className={input}
            />

            <button className="w-full mt-5 p-2 bg-black/80 text-slate-100 font-bold text-md rounded-lg">
              Sign up with Email
            </button>
          </form>

          <p className="underline text-center mt-2 text-slate-400 font-light">
            Forgot Password
          </p>
        </div>
        <div className="text-center text-white mt-10">
          <p className="text-white/80 tracking-wider">
            Already have an account?
          </p>
          <Link href="/login">
            <p className="underline">Login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
