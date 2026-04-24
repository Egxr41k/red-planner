'use client'
import { useEffect, useState } from "react"
import { useLoadSettings } from "./useLoadSettings"
import { IPomodoroRoundResponse } from "@/types/pomodoro.types"

export const useTimer = () => {
    const {workInterval, breakInterval} = useLoadSettings()

    const [isRunning, setIsRunning] = useState(false)
    const [isBreakTime, setIsBreakTime] = useState(false)


    const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
    const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isRunning) {
            interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1)
        },1000)
        } else if (!isRunning && secondsLeft !== 0 && interval) {
            clearInterval(interval)
        }
        return () => {
            if(interval) clearInterval(interval)
        }
    }, [isRunning, secondsLeft, activeRound, workInterval])

    useEffect(() => {
        if (secondsLeft > 0) return
        
        setIsBreakTime(!isBreakTime)
        setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
    }, [breakInterval, workInterval, secondsLeft, isBreakTime])

    return {activeRound,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft,
		isRunning}

}