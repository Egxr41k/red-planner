'use client'
import type { ITaskResponse, TypeTaskFormState } from "@/types/task.type"
import type { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTaskHandler} from "../hooks/useTaskDebounce"
import cn from 'clsx'
import { GripVertical, Loader, Trash } from "lucide-react"
import Checkbox from "@/components/checkbox/Checkbox"
import { DatePicker } from "@/components/task-priority/date-picker/DatePicker"
import { IOption, SingleSelect } from "@/components/task-priority/SingleSelect"
import { useDeleteTask } from "../hooks/useDeleteTask"
import styles from './List.module.scss'
import { TransparentField } from "@/components/inputs/TransparentField"


interface IListRow {
    item: ITaskResponse
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const ListRow = ({ item, setItems }: IListRow) => {
    const { register, control, watch, getValues } = useForm<TypeTaskFormState>({
        defaultValues: {
            name: item.name,
            isCompleted: item.isCompleted,
            createdAt: item.createdAt,
            priority: item.priority
        }
    })

   const {handleBlur, handleKeyDown} = useTaskHandler({itemId: item.id, watch})

    const {deleteTask, isDeletePending} = useDeleteTask()
    
    return <div className={cn(
				styles.row,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
    )}>
        <div>
            <span className='inline-flex items-center gap-2.5 w-full'>
                <button aria-describedby='todo-item'>
                    <GripVertical className={styles.grip}/>
                </button>
                <Controller
						control={control}
						name='isCompleted'
						render={({ field: { value, onChange } }) => (
							<Checkbox
								onChange={onChange}
								checked={value}
							/>
						)}
                />
                
                <TransparentField onKeyDown={(e) => {
                 if (e.key === "Enter") {
            handleKeyDown(e, getValues()); 
            (e.target as HTMLInputElement).blur(); 
        }
                }} {...register('name', {
                    onBlur: () => {
                        handleBlur(getValues())
                      }
                  })} />
            </span>
        </div>
        <div>
            <Controller
                control={control}
                name="createdAt"
                render={({ field: { value, onChange } }) => <DatePicker onChange={onChange} value={ value || ""} />}
            />
        </div>
        <div className='capitalize'>
            <Controller
                control={control}
                name="priority"
                render={({ field: { value, onChange } }) =>
                    <SingleSelect
                        onChange={onChange}
                        data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							})) as IOption[]}
                        value={value || 'medium'}
                    />}
            />
        </div>
        <div>
            <button
                className='opacity-50 transition-opacity hover:opacity-100'
                onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}>
                {isDeletePending ? <Loader size={24}/> : <Trash size={24}/>}
            </button>
        </div>
    </div>

}

export default ListRow