'use client'
import { pomodoroService } from "@/services/pomodoro.service"
import { useQuery } from "@tanstack/react-query"
import {  useEffect } from "react"
import { useLoadSettings } from "./useLoadSettings"
import  type { ITimerState } from "../timer.types"


export const useTodaySession = ({ setActiveRound, setSecondsLeft}: ITimerState) => {
    const  {workInterval} = useLoadSettings()

    const { data: sessionResponce, isLoading, isSuccess} = useQuery({
        queryKey: ['get today session'],
        queryFn: () => pomodoroService.getTodaySession()
    })
    

    const rounds = sessionResponce?.data.round

    useEffect(() => {
        if (isSuccess && rounds) {
            const activeRound = rounds.find(round => !round.isCompeted) 
            setActiveRound(activeRound)
            if (activeRound && activeRound.totalSeconds !== 0) {
                setSecondsLeft(activeRound.totalSeconds )
            }
        }
    }, [isSuccess, rounds])
    
    return {sessionResponce, isLoading,  workInterval}
}