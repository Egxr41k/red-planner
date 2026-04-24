import { ITimeBlockResponse, TypeTimeBlockForm } from "@/types/time-block.types";
import { useTimeBlockSortable } from "./hooks/useTimeBlockSortable";
import { useFormContext } from "react-hook-form";
import { useDeleteTimeBlock } from "./hooks/useDeleteTimeBlock";
import styles from './TimeBlocking.module.scss'
import { Edit, GripVertical, Loader, Trash } from "lucide-react";


const TimeBlock = ({ item }: { item: ITimeBlockResponse }) => {
    
    const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(item.id)
    
    const { reset } = useFormContext<TypeTimeBlockForm>()
    
    const {deleteTimeBlock, isDeletePending} = useDeleteTimeBlock(item.id)

    return <div
        ref={setNodeRef}
        style={style}>
        <div style={{
            backgroundColor: item.color || 'lightgray',
            height: `${item.duration}px`
        }} className={styles.block}>
            <div className='flex items-center'>
                <button
                    {...attributes}
                    {...listeners}
                    aria-describedby='time-block'
                >
                    <GripVertical className={styles.grip}/>
                </button>
                <div>
                    {item.name}{' '}
					<i className='text-xs opacity-50'>({item.duration} min.)</i>
                </div>
            </div>
            <div className={styles.actions}>
                <button
                    onClick={() => {
                        reset({
                        name: item.name,
                        order: item.order,
                        duration: item.duration,
                        id: item.id,
                        color: item.color,
                    })}}
                    className='opacity-50 transition-opacity hover:opacity-100 mr-2'
                >
                    <Edit size={24} />
                </button>
                <button
                    onClick={() => deleteTimeBlock()}
                    className='opacity-50 transition-opacity hover:opacity-100'>
                    {isDeletePending ? <Loader size={24}/> : <Trash size={24}/>}

                </button>
            </div>
        </div>
</div>

}

export default TimeBlock