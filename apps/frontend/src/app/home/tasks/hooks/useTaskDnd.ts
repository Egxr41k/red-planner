import { FILTERS } from "../column.data"
import { useUpdateTasks } from "./useUpdateTasks"
import { DropResult } from '@hello-pangea/dnd'


export const useTaskDnd = () => {
    const { updateTasks } = useUpdateTasks()

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const destinationColumnId = result.destination.droppableId

        if (destinationColumnId === result.source.droppableId) return
        
        if (destinationColumnId === "completed") {
            updateTasks({
                id: result.draggableId,
                data: {
                    isCompleted: true
                }
            })
              return
        }
        
        const newCreatedAt = FILTERS[destinationColumnId].format()

        updateTasks({
            id: result.draggableId,
            data: {
                createdAt: newCreatedAt,
                isCompleted: false
            }
        })
    }
    
    return {onDragEnd}
}