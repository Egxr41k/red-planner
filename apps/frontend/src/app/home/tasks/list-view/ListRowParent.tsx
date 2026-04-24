'use client'

import { ITaskResponse } from "@/types/task.type"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Dispatch, SetStateAction } from "react"
import styles from './List.module.scss'
import ListRow from "./ListRow"
import { FILTERS } from "../column.data"

import ListAddRowInput from "./ListAddRowInput"
import { filterTasks } from "../filterTask"


interface IListRowParent {
    value: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


const ListRowParent = ({ value, label, items, setItems }: IListRowParent) => {
    

    return <Droppable droppableId={value}>
        {provided =>
            <div 
            ref={provided.innerRef}
                {...provided.droppableProps}>
                   <div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
            </div>
            {filterTasks(items, value)?.map((item, index) => (
						<Draggable
							key={item.id}
							draggableId={item.id}
							index={index}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<ListRow
										key={item.id}
										item={item}
										setItems={setItems}
									/>
								</div>
							)}
						</Draggable>
					))}

                {provided.placeholder}
                {value !== 'completed' && !items?.some(item => !item.id) && (
						<ListAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
        </div>}

    </Droppable>

}

export default ListRowParent