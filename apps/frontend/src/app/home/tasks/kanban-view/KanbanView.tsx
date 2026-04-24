'use client'

import { DragDropContext } from "@hello-pangea/dnd"
import { useTaskDnd } from "../hooks/useTaskDnd"
import { useTasks } from "../hooks/useTasks"
import styles from "./Kanban.module.scss"
import { COLUMNS } from "../column.data"
import KanbanRowParent from "./KanbanRowParent"


const KanbanView = () => {

    const { setItems, items } = useTasks()
    const {onDragEnd} = useTaskDnd()


    return <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
            {COLUMNS.map(column =>
                <KanbanRowParent
                    key={column.value}
					value={column.value}
					label={column.label}
					items={items}
					setItems={setItems}
                />)}

</div>
    </DragDropContext>
}

export default KanbanView