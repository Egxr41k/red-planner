'use client'
import { ITaskResponse } from "@/types/task.type"
import { Dispatch, SetStateAction } from "react"


interface IKanbanAddRowInput {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanAddRowInput = ({ setItems, filterDate }: IKanbanAddRowInput) => {
    
    const addRow = () => {
        setItems(prev => {
            if (!prev) return
            
            return [...prev, {
                id: '',
                name: '',
                createdAt: filterDate,
                isCompleted: false
            }]
        })
    }
    return <div className='mt-5'>
			<button
				onClick={addRow}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
    
}

export default KanbanAddRowInput