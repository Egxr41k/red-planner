"use client"

import { TypeUserForm } from "@/types/auth.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useControlForm } from "./useControlForm"
import { useUpdateSettings } from "./useUpdateSettings"
import { Input } from "@/components/inputs/Input"
import { Button } from "@/components/buttons/button"


const Settings = () => {

    const { handleSubmit, reset, register } = useForm<TypeUserForm>({
    mode: "onChange"
    })
    
    useControlForm(reset)

    const { isPending, mutate } = useUpdateSettings()
    
    const submit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...rest } = data
        mutate({...rest, password: password || undefined})
    }

    return <div>
        <form className='w-2/4' onSubmit={handleSubmit(submit)}>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                    <Input {...register('email', {
                        required: "Email is required!"
                    })}
                        id='email'
                        extra='mb-4'
                        label="Email: "
                        placeholder="Email"
                        type="email" />
                    <Input
                        id="name"
                        label="Name: "
                        placeholder="Name"
                        {...register('name')}
                        extra='mb-4'
                    />
                    <Input
                        id="password"
                        type="password"
                        label="Password: "
                        placeholder="Password"
                        extra='mb-10'
                        {...register("password")}
                    />
                </div>
                <div>
                    <Input
                        id="workInterval"
                        label="Work interval (min.): "
                        placeholder="Enter work interval (min.):"
                        isNumber
                        extra='mb-4'
                        {...register("workInterval", {
                            valueAsNumber: true
                        })}
                    />
                    <Input
                        id="breakInterval"
                        extra='mb-4'
                        label="Break interval (min.): "
                        placeholder="Enter break interval (min.):"
                        isNumber
                        {...register('breakInterval', {
                            valueAsNumber: true
                        })}
                    />
                    <Input
                        id='intervalsCount'
							label='Intervals count (max 10): '
							placeholder='Enter intervals count (max 10): '
							isNumber
							{...register('intervalsCount', {
								valueAsNumber: true
							})}
							extra='mb-6'
                    />
                </div>
            </div>
            <Button type="submit" disabled={isPending}>
                Save
            </Button>
        </form>
    </div>
}

export default Settings