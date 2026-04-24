import { axiosWithAuth } from "@/api/interceptors"
import { ITimeBlockResponse, TypeTimeBlockForm } from "@/types/time-block.types"



class TimeBlockService {
    private BASE_URL = "/user/time-blocks"

    async getTimeBlock () {
        const res = await axiosWithAuth.get<ITimeBlockResponse[]>(this.BASE_URL)
        
        return res
    }

    async updateTimeBlock(id: string, data: TypeTimeBlockForm) {
        const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)

        return res
    }

    async updateOrderTimeBlock(ids: string[]) {
        const res = await axiosWithAuth.put(`${this.BASE_URL}/update-order`,{ ids})

        return res
    }

    async createTimeBlock(data: TypeTimeBlockForm) {
        const res = await axiosWithAuth.post(this.BASE_URL, data)

        return res
    }

    async deleteTimeBlock(id: string) {
        const res = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        
        return res
    }

}

export const timeBlockService = new TimeBlockService()