import { TypeTimeBlockForm } from "@/types/time-block.types"
import { Controller, SubmitHandler, useFormContext } from "react-hook-form"
import { useCreateTimeBlock } from "../hooks/useCreateTimeBlock"
import { useUpdateTimeBlock } from "../hooks/useUpdateTimeBlock"
import { COLORS } from "./colors.data"
import { Input } from "@/components/inputs/Input"
import { SingleSelect } from "@/components/task-priority/SingleSelect"
import { Button } from "@/components/buttons/button"

const TimeBlockForm = () => {
const {control, register, watch, reset, handleSubmit, getValues} = useFormContext<TypeTimeBlockForm>()

    const existId = watch('id')

    const { createTimeBlock, isPendingTimeBlock } = useCreateTimeBlock()
    const { updateTimeBlock } = useUpdateTimeBlock(existId)
    
    const onSubmit: SubmitHandler<TypeTimeBlockForm> = data => {
        const { color, id, ...rest } = data
        const dto = { ...rest, color: color || undefined }
        
        if (id) {
            updateTimeBlock({
                id,
                data: dto
            })
        } else {
            createTimeBlock(dto)
        }
        reset({
            color: COLORS[COLORS.length - 1],
            duration: 0,
            name: "",
            id: undefined,
            order: 1
        })
    }

    return <form
        className='w-3/5'
        onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name', {
            required: true
        })}
            id="name"
            label="Name"
            placeholder="Enter name: "
            extra='mb-4' />
        <Input {...register('duration', {
            required: true,
            valueAsNumber: true
        })}
            id="duration"
            placeholder="Enter duration (min.): "
            label="Enter duration (min.): "
            isNumber
            extra='mb-4'
        />
        <div>
            <span className='inline-block mb-1.5'>Color:</span>
            <Controller
                control={control}
                name="color"
                render={({ field: { value, onChange } }) =>
                    <SingleSelect data={COLORS.map(item => ({
								value: item,
								label: item
							}))}
                        value={value || COLORS[COLORS.length - 1]}
                        onChange={onChange}
                        isColorSelect />} />
        </div>
        <Button
            className='mt-6'
            disabled={isPendingTimeBlock}
            type="submit">
            {existId ? 'Update' : 'Create'}
</Button>
    </form>
}

export default TimeBlockForm