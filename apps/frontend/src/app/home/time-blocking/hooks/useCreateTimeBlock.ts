import { timeBlockService } from "@/services/time-block.service"
import { TypeTimeBlockForm } from "@/types/time-block.types"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateTimeBlock = () => {
    const queryClient = useQueryClient()
    
    const { mutate: createTimeBlock, isPending: isPendingTimeBlock} = useMutation({
        mutationKey: ['create time-block'],
        mutationFn: (data: TypeTimeBlockForm) => timeBlockService.createTimeBlock(data),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ['time-blocks']})
        }
    })

    return {createTimeBlock, isPendingTimeBlock}
}