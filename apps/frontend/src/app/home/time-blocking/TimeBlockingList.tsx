import { Loader } from "lucide-react"
import { useTimeBlockDnd } from "./hooks/useTimeBlockDnd"
import { useTimeBlocks } from "./hooks/useTimeBlocks"
import { calcLeftTime } from "./calc-left-time"
import styles from './TimeBlocking.module.scss'
import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import TimeBlock from "./TimeBlock"

const TimeBlockingList = () => {
    const { items, setItems, isLoading } = useTimeBlocks()
    const { handlerDragEnd, sensors } = useTimeBlockDnd(items, setItems)

    const {hoursLeft }= calcLeftTime(items)
    
    if(isLoading) return <Loader size={24}/>


    return <div>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handlerDragEnd}>
            <div className={styles.list}>
                <SortableContext
                    items={items || []}
                    strategy={verticalListSortingStrategy}
                >
                    {items?.length ?
                        (items?.map(item => <TimeBlock key={item.id} item={item} />)) :
                        <div>Add the first time-block on the right form</div>}
                </SortableContext>
            </div>
        </DndContext>
        <div>
            {hoursLeft > 0 ?
                `${hoursLeft} hours out of 24 left for sleep` :
                'No hours left for sleep'}
        </div>
    </div>
}

export default TimeBlockingList