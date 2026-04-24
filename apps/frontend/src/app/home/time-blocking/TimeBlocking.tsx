'use client'

import { TypeTimeBlockForm } from "@/types/time-block.types"
import { FormProvider, useForm } from "react-hook-form"
import TimeBlockForm from "./form/TimeBlockForm"
import TimeBlockingList from "./TimeBlockingList"

const TimeBlocking = () => {

    const methods = useForm<TypeTimeBlockForm>()

    return <FormProvider {...methods}>
        <div className='grid grid-cols-2 gap-12'>
            <TimeBlockingList/>
            <TimeBlockForm/>
        </div>

    </FormProvider>
}

export default TimeBlocking