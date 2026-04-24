'use client'
import { useTimer } from "./hooks/useTimer"
import { useTodaySession } from "./hooks/useTodaySession"
import { useTimerActions } from "./hooks/useTimerActions"
import { formatTime } from "./format-time"
import { Loader, Pause, Play, RefreshCcw } from "lucide-react"
import PomodoroRounds from "./rounds/PomodoroRounds"
import { Button } from "@/components/buttons/button"
import { useDeleteSession } from "./hooks/useDeleteSession"
import { useCreateSession } from "./hooks/useCreateSession"


const Pomodoro = () => {
    const timerState = useTimer()
    const { isLoading, sessionResponce, workInterval} = useTodaySession(timerState)
    const rounds = sessionResponce?.data.round
    const action = useTimerActions({ ...timerState, rounds })
    const { deleteSession, isPendingDeleteSession } = useDeleteSession(() => timerState.setSecondsLeft(workInterval * 60))
    const {createSession, isPendingCreateSession} = useCreateSession()

    return <div className='relative w-80 text-center'>
        {!isLoading && <div className='text-7xl font-semibold'>
            {formatTime(timerState.secondsLeft) }
        </div>}
        {isLoading ? <Loader size={24} /> : sessionResponce?.data ? <>
            <PomodoroRounds
                rounds={rounds}
                nextRoundHandler={action.nextRoundHandler}
                prevRoundHandler={action.prevRoundHandler}
                activeRound={timerState.activeRound} />
            <button className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
                onClick={timerState.isRunning ? action.pauseHandler : action.playHandler}
                disabled={action.isPendingUpdateRound}
            >
                {timerState.isRunning ? <Pause size={24}/>: <Play size={24}/>}
            </button>
            <button onClick={() => {
                timerState.setIsRunning(false)
                deleteSession(sessionResponce?.data.id)

            }}
                className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
                disabled={isPendingDeleteSession}>
                <RefreshCcw size={24} />
                </button>
        </> : <Button className='mt-1'
                disabled={isPendingCreateSession}
            onClick={() => createSession()}>Create session</Button>}
    </div>
}

export default Pomodoro