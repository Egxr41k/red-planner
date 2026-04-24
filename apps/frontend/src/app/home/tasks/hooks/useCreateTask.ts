import { taskService } from "@/services/task.service"
import { TypeTaskFormState } from "@/types/task.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateTask = () => {
    const querty = useQueryClient()

    const { mutate: createTask } = useMutation({
        mutationKey: ['task create'],
        mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
        onSuccess() {
      querty.invalidateQueries({queryKey: ['tasks']})
        }
    })
    return {createTask}
}