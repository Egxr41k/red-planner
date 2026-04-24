import { timeBlockService } from "@/services/time-block.service"
import { TypeTimeBlockForm } from "@/types/time-block.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTimeBlock = (key?:string) => {
    const queryClient = useQueryClient()
    
    const { mutate: updateTimeBlock, isPending: isPendingUpdateTimeBlock} = useMutation({
        mutationKey: ['update time-block', key],
        mutationFn: ({ id, data }: { id: string, data: TypeTimeBlockForm }) => timeBlockService.updateTimeBlock(id, data),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ['time-blocks']})
        }
    })

    return {updateTimeBlock, isPendingUpdateTimeBlock}
}