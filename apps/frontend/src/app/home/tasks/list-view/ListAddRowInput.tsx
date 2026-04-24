'use client'
import { ITaskResponse } from "@/types/task.type"
import { Dispatch, SetStateAction } from "react"
import styles from "./List.module.scss"

interface IListAddRowInput {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const ListAddRowInput = ({ setItems, filterDate }: IListAddRowInput) => {
    
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
    return <div className={styles.addRow}>
			<button
				onClick={addRow}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
    
}

export default ListAddRowInput