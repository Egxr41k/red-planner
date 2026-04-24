'use client'
import Loader from "@/components/Loader"
import { useProfile } from "@/hooks/useProfile"


const Statistics = () => {
    const {data, isLoading} = useProfile()


    return isLoading ? <Loader /> : <div className='grid grid-cols-4 gap-12 mt-7'>
        {data?.statistic.length ? data.statistic.map(item => <div
						className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
						key={item.label}
					>
						<div className='text-xl'>{item.label}</div>
						<div className='text-3xl font-semibold'>{item.value}</div>
					</div>) : <div>Statistics not found</div>}
    </div>
}

export default Statistics