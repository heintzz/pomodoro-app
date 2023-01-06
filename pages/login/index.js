import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import Separator from '../../components/Separator'
import useInput from '../../hooks/useInput'

const input =
  'w-full bg-slate-100 text-slate-500 p-2 font-light text-md rounded-lg'
const label = 'text-slate-300 tracking-wide'

export default function login() {
  const [user, setUser] = useState({})
  const email = useInput('')
  const password = useInput('')

  async function submitHandler(e) {
    e.preventDefault()

    setUser({
      email: email.value,
      password: password.value,
    })

    const result = await axios.post('http://localhost:3400/auth', user)
    console.log(result)
  }

  return (
    <div className="p-[18px] w-screen">
      <div className="max-w-[400px] mx-auto">
        <div className="text-center text-white mb-10">
          <h1 className="text-[35px]">Pomodoro</h1>
          <p className="text-white/80 tracking-wider">Login</p>
        </div>
        <div className="flex flex-col p-[18px] rounded-lg bg-white gap-y-3">
          <button className="w-full p-2 bg-slate-100 text-slate-500 font-bold text-md rounded-lg">
            Login with Google
          </button>
          <Separator />
          <form className="flex flex-col gap-y-3" onSubmit={submitHandler}>
            <label htmlFor="email" className={label}>
              EMAIL
            </label>
            <input
              type="text"
              placeholder="example@mail.com"
              id="email"
              className={input}
              {...email}
            />
            <label htmlFor="password" className={label}>
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="•••••••"
              id="password"
              className={input}
              {...password}
            />
            <button className="w-full mt-5 p-2 bg-black/80 text-slate-100 font-bold text-md rounded-lg">
              Login with Email
            </button>
          </form>

          <p className="underline text-center mt-2 text-slate-400 font-light">
            Forgot Password
          </p>
        </div>
        <div className="text-center text-white mt-10">
          <p className="text-white/80 tracking-wider">
            Do not have an account?
          </p>
          <Link href="/register">
            <p className="underline">Create account</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
