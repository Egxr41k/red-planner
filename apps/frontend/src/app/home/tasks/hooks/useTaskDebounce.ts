import { UseFormWatch } from "react-hook-form"
import debounce from "lodash.debounce"
import { useCallback, useEffect } from "react"

import { useCreateTask } from "./useCreateTask"
import { useUpdateTasks } from "./useUpdateTasks"
import { TypeTaskFormState } from "@/types/task.type"

interface IUseTaskDebounce {
  itemId?: string
  watch: UseFormWatch<TypeTaskFormState>
}

export const useTaskHandler = ({ itemId, watch }: IUseTaskDebounce) => {
  const { createTask } = useCreateTask()
  const { updateTasks } = useUpdateTasks()

  const saveTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      if (itemId) {
        updateTasks({ id: itemId, data: formData })
      } else {
        createTask(formData)
      }
    }, 444), 
    [itemId, createTask, updateTasks]
  )

  const handlerUpdateTask = useCallback(debounce((formData: TypeTaskFormState) => {
    if (itemId) {
      updateTasks({id: itemId, data: formData})
    }
  }, 444), [])

  useEffect(() => {
    const { unsubscribe} = watch(formData => {
      if (itemId) {
        handlerUpdateTask({
          ...formData,
          priority: formData.priority || undefined
        })
      }
    })
    return () => {
      unsubscribe()
    }
  },[watch(), handlerUpdateTask])

  
  const handleBlur = useCallback(
    (formData: TypeTaskFormState) => {
      saveTask(formData)
    },
    [saveTask]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>, formData: TypeTaskFormState) => {
      if (e.key === "Enter") {
        e.preventDefault()
        saveTask(formData)
      }
    },
    [saveTask]
  )

  return { handleBlur, handleKeyDown }
}