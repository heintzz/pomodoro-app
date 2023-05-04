import axios from '../../axios'
import Link from 'next/link'
import React, { useState } from 'react'
import Separator from '../../components/Separator'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const input =
  'w-full bg-slate-100 text-slate-600 p-2 font-light text-md rounded-lg'
const label = 'text-slate-400 tracking-wide'

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)

  if (cookies?.refreshToken) {
    return {
      redirect: {
        destination: '/',
      },
    }
  }
  return { props: {} }
}

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  function changeValue(e) {
    const target = e.target
    const type = target.type
    const value = target.value

    setUser({
      ...user,
      [type]: value,
    })
  }

  function resetError() {
    setIsError(false)
    setErrorMsg('')
  }

  function submitHandler(e) {
    e.preventDefault()
    async function login() {
      try {
        const result = await axios.post('/auth', user)
        if (result?.data?.accessToken) {
          e.target.reset()
          resetError()
          dispatch({ type: 'INSERT_TOKEN', payload: result.data.accessToken })
          router.replace('/')
        }
        login()
      } catch (err) {
        const errMsg = err.response?.data?.msg
        console.log(err)
        setIsError(true)
        setErrorMsg(errMsg)
        setTimeout(() => {
          resetError()
        }, 2000)
      }
    }
    login()
  }

  return (
    <div className="bg-[#ca5652] w-screen h-screen p-4">
      <div className="max-w-[400px] mx-auto">
        <div className="text-center text-white mb-10">
          <h1 className="text-[35px]">Pomodoro</h1>
          <p className="text-white/80 tracking-wider">Login</p>
        </div>
        <div className="flex flex-col p-[18px] rounded-lg bg-white gap-y-3">
          <Link href="http://localhost:3500/auth/google">
            <button className="w-full p-2 bg-slate-100 text-slate-500 font-bold text-md rounded-lg">
              Login with Google
            </button>
          </Link>
          <Separator />
          <form className="flex flex-col gap-y-3" onSubmit={submitHandler}>
            <label htmlFor="email" className={label}>
              EMAIL
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              id="email"
              className={input}
              onChange={changeValue}
            />
            <label htmlFor="password" className={label}>
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="•••••••"
              id="password"
              className={input}
              onChange={changeValue}
            />
            {isError && <p className="text-red-600">{errorMsg}</p>}
            <button
              type="submit"
              className={`w-full ${
                !isError && 'mt-5'
              } p-2 bg-black/80 text-slate-100 font-bold text-md rounded-lg`}
            >
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
