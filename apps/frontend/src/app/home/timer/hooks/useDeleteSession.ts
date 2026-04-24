import { pomodoroService } from "@/services/pomodoro.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteSession = (onDeleteSuccess: () => void) => {
 
    const queryClient = useQueryClient()

    const {mutate: deleteSession, isPending: isPendingDeleteSession } = useMutation({
        mutationKey: ['delete session'],
        mutationFn: (id: string) => pomodoroService.deleteSession(id),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['get today session'] })
            onDeleteSuccess()
        },
       
})

    return {deleteSession, isPendingDeleteSession}
}