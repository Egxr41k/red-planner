import { taskService } from "@/services/task.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useDeleteTask = () => {
    const querty = useQueryClient()

    const {mutate: deleteTask, isPending: isDeletePending } = useMutation({
        mutationKey: ['delete task'],
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess() {
            querty.invalidateQueries({queryKey: ['tasks']})
        }
    })

    return {deleteTask, isDeletePending}
}