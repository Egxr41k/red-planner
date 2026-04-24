import { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import type { ITimerState } from "../timer.types"
import { useLoadSettings } from "./useLoadSettings"
import { useUpdateRound } from "./useUpdateRound"


type TypeUseTimerActions = ITimerState & {
    rounds: IPomodoroRoundResponse[] | undefined
}

export const useTimerActions = ({ secondsLeft, activeRound, setIsRunning, rounds, setActiveRound, setSecondsLeft }: TypeUseTimerActions) => {
    const { workInterval } = useLoadSettings()
    const {updateRound, isPendingUpdateRound} = useUpdateRound()

    const pauseHandler = () => {
        setIsRunning(false)
        if (!activeRound?.id) return  

        updateRound({
                id: activeRound?.id || '',
                data: {
                    totalSeconds: secondsLeft,
                    isCompeted: Math.floor(secondsLeft / 60) >= workInterval
                }
            })
        
        
    }

    const playHandler = () => {
    setIsRunning(true)
    }

    const nextRoundHandler = () => {
        if (!activeRound?.id) return 
        
        updateRound({
            id: activeRound?.id || '',
            data: {
                isCompeted: true,
                totalSeconds: workInterval * 60
            }
        })
         setSecondsLeft(workInterval * 60)
    }

    const prevRoundHandler = () => {
        const lastCompletedRound = rounds?.findLast(round => round.isCompeted)

        if (!lastCompletedRound?.id) return

        updateRound({
            id: lastCompletedRound?.id,
            data: {
                isCompeted: false,
                totalSeconds: 0
            }
        })
        setActiveRound(lastCompletedRound)
    }



    return {isPendingUpdateRound, nextRoundHandler, prevRoundHandler, pauseHandler, playHandler}
}