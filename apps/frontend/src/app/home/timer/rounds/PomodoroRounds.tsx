import cn from 'clsx'
import styles from './PomodoroRounds.module.scss'
import { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import { ChevronLeft, ChevronRight } from 'lucide-react'


interface IPomodoroRounds {
    rounds: IPomodoroRoundResponse[] | undefined
    nextRoundHandler: () => void
    prevRoundHandler: () => void
    activeRound: IPomodoroRoundResponse | undefined

}

const PomodoroRounds = ({ rounds, nextRoundHandler, prevRoundHandler, activeRound }: IPomodoroRounds) => {
    
    const isCanPrevRound = rounds ? rounds.some(round => round.isCompeted) : false
    const isNextRound = rounds ? !rounds[rounds.length - 1].isCompeted : false

    return <div className={styles.container}>
        <button
            className={styles.button}
            disabled={!isCanPrevRound}
            onClick={() => isCanPrevRound ? prevRoundHandler() : false}>
            <ChevronLeft size={24} />
        </button>
        <div className={styles.roundsContainer}>
            {rounds && rounds.map((round, index) =>
                <div
                    key={index}
                    className={cn(styles.round, {
								[styles.completed]: round.isCompeted,
								[styles.active]:
									round.id === activeRound?.id && !round.isCompeted
							})}/>)}
        </div>
        <button
            className={styles.button}
            disabled={!isNextRound}
            onClick={() => isNextRound ? nextRoundHandler() : false}>
            <ChevronRight size={24} />
            </button>
    </div>

}

export default PomodoroRounds