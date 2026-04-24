import cn from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { useState } from 'react'
import { DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import {formatCaption} from '../date-picker/DatePickerFormatCaption'
import './DatePicker.scss'
import { useOutside } from '@/hooks/useOutside'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
    onChange: (value: string) => void
    value: string
    position?: "left" | "right"
}


export const DatePicker = ({ onChange, value, position = 'right' }: IDatePicker) => {
    const [selected, setSelected] = useState<Date>()
    const {ref, isShow, setIsShow} = useOutside(false)
    
    const handlerSelectDay  = (data: Date | undefined) => {
        const IOSDate = data?.toISOString()
 
        setSelected(data)
        if (IOSDate) {
            onChange(IOSDate)
            setIsShow(false)
        } else {
            onChange("")
        }
    }


    return <div
        className='relative'
        ref={ref}>
        <button onClick={() => setIsShow(!isShow)}>
            {value ? dayjs(value).format("LL") : "Click for select"}
        </button>
        {value &&
            <button
            className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity'
                onClick={() => onChange("")}>
                <X size={14}/>
            </button>}
        {isShow && (<div className={cn(
						'absolute p-2.5 slide bg-sidebar z-10 shadow rounded-lg',
						position === 'left' ? '-left-4' : ' -right-4'
					)}
					style={{
						top: 'calc(100% + .7rem)'
            }}>
           <DayPicker
                        startMonth={new Date(2024, 0)}
                        endMonth={new Date(2054, 11)}
						autoFocus={isShow}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handlerSelectDay}
						weekStartsOn={1}
						formatters={{ formatCaption }}
					/>

        </div>)}
        </div>
}