import { useState } from 'react'

export default function Setting({ settings, updateTimer }) {
    const [input, setInput] = useState({})
    const [init, setInit] = useState(true)

    function inputChange(e) {
        const target = e.target
        const name = target.id
        const value = target.value
        setInit(false)
        setInput((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    function submitSetting() {
        updateTimer(input)
        setInit(true)
    }

    return (
        <div className="font-Poppins my-20 flex h-fit w-fit flex-col gap-y-2 rounded-md bg-white p-3 shadow-neutral-700">
            <p className="tracking-wide">TIMER SETTING</p>
            <hr className="h-1 border-none bg-[#ca5652]" />
            <div className="flex flex-col gap-y-2">
                <p>Time(minutes)</p>
                <form className="flex gap-x-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="pomodoroDuration">Pomodoro</label>
                        <input
                            type="number"
                            id="pomodoroDuration"
                            value={
                                input.pomodoroDuration?.length || !init
                                    ? input.pomodoroDuration
                                    : settings.pomodoroDuration
                            }
                            className="w-24 rounded-md bg-red-100 p-2"
                            onChange={inputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="shortBreakDuration">Short Break</label>
                        <input
                            type="number"
                            id="shortBreakDuration"
                            value={
                                input.shortBreakDuration?.length || !init
                                    ? input.shortBreakDuration
                                    : settings.shortBreakDuration
                            }
                            className="w-24 rounded-md bg-red-100 p-2"
                            onChange={inputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="long break">Long Break</label>
                        <input
                            type="number"
                            id="longBreakDuration"
                            value={
                                input.longBreakDuration?.length || !init
                                    ? input.longBreakDuration
                                    : settings.longBreakDuration
                            }
                            className="w-24 rounded-md bg-red-100 p-2"
                            onChange={inputChange}
                        />
                    </div>
                </form>
                <button
                    type="submit"
                    onClick={submitSetting}
                    className="mt-5 ml-auto w-fit rounded-md bg-[#ca5652] py-2 px-5 text-white"
                >
                    OK
                </button>
            </div>
        </div>
    )
}
