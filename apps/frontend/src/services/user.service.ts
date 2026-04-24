import {  axiosWithAuth } from "@/api/interceptors";
import { IUser, TypeUserForm } from "@/types/auth.types";


export interface IUserResponce {
    user: IUser,
    statistic: {
        label: string,
        value: string
    }[]
}

export class UserService {
    BASE_URL = 'user/profile'

    async getUser() {
        const responce = await axiosWithAuth.get<IUserResponce>(this.BASE_URL)
        return responce.data

    }

    async updateUser(data: TypeUserForm) {
        const responce = await axiosWithAuth.put(this.BASE_URL, data)
        return responce.data
    }
}

export const userService = new UserService()