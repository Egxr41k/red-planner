'use client'

import { DragDropContext } from "@hello-pangea/dnd"
import { useTaskDnd } from "../hooks/useTaskDnd"
import { useTasks } from "../hooks/useTasks"
import styles from "./List.module.scss"
import { COLUMNS } from "../column.data"
import ListRowParent from "./ListRowParent"


const ListView = () => {

    const { setItems, items } = useTasks()
    const {onDragEnd} = useTaskDnd()


    return <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.table}>
            <div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
            </div>
            <div className={styles.parentsWrapper}>
                {COLUMNS.map(column =>
                    <ListRowParent
                        items={items}
                        value={column.value}
                        label={column.label}
                        setItems={setItems}
                        key={column.value}
                    />)}

            </div>

</div>
    </DragDropContext>
}

export default ListView