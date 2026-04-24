import { taskService } from "@/services/task.service"
import { TypeTaskFormState } from "@/types/task.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTasks = (key?: string) => {
const query = useQueryClient()

    const {mutate: updateTasks } = useMutation({
        mutationKey: ['update task', key],
        mutationFn: ({ id, data }: { id: string, data: TypeTaskFormState }) => taskService.updateTask(id, data),
        onSuccess() {
            query.invalidateQueries({
            queryKey: ['tasks']
        })
        }

    })
    return { updateTasks }
}