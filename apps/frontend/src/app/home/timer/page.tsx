import type { Metadata } from 'next'


import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/Heading'
import Pomodoro from './Pomodoro'



export const metadata: Metadata = {
	title: 'Pomodoro timer',
	...NO_INDEX_PAGE
}

export default function PomodoroPage() {
	return (
		<div>
			<Heading title='Pomodoro timer' />
			<Pomodoro/>
		</div>
	)
}