'use client'

import { ITaskResponse } from "@/types/task.type"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Dispatch, SetStateAction } from "react"
import styles from './Kanban.module.scss'
import KanbanCard from "./KandanCard"
import { FILTERS } from "../column.data"

import KanbanAddRowInput from "./KanbanAddRowInput"
import { filterTasks } from "../filterTask"


interface IKanbanRowParent {
    value: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


const KanbanRowParent = ({ value, label, items, setItems }: IKanbanRowParent) => {
	
    return <Droppable droppableId={value} key={`droppable-${value}`}>
        {provided =>
            <div 
            ref={provided.innerRef}
				{...provided.droppableProps}>
				
                   <div className={styles.column}>
					<div className={styles.columnHeading}>{label}</div>
					{filterTasks(items, value)?.map((item, index) =>
						<Draggable
						    key={item.id}
							draggableId={item.id}
							index={index}>
							{provided =>
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<KanbanCard
										key={item.id}
										item={item}
										setItems={setItems} />
							</div>}
						</Draggable>)}
					{provided.placeholder}
					{value !== 'completed' && !items?.some(item => !item.id) && 
						<KanbanAddRowInput
						setItems={setItems}
						filterDate={FILTERS[value] ? FILTERS[value].format(): undefined}
						/>}
            </div> 
        </div>}

    </Droppable>

}

export default KanbanRowParent