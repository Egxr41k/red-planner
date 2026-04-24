'use client'
import { userService } from "@/services/user.service"
import { TypeUserForm } from "@/types/auth.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"



export const useUpdateSettings = () => {
    
    const queryClient = useQueryClient()

    const { mutate, isPending} = useMutation({
        mutationKey: ['profile update'],
        mutationFn: (data: TypeUserForm) => userService.updateUser(data),
        onSuccess() {
            toast.success("Successfully update your profile")
            queryClient.invalidateQueries({queryKey: ['profile']})
        }
})
return {mutate, isPending}
}