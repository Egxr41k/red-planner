import { axiosClassic } from "@/api/interceptors";
import { IAuthForm, IAuthResponse } from "@/types/auth.types";
import { removeAccessToken, saveAccessToken } from "./auth-token.service";

export const authService = {
    async main(type: "login" | "register", data: IAuthForm) {
        const responce = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data)
        if (responce.data.accessToken) saveAccessToken(responce.data.accessToken)
        return responce
    },
    

    async getNewToken() {
        const responce = await axiosClassic.post<IAuthResponse>('auth/login/access-token')
        if (responce.data.accessToken) saveAccessToken(responce.data.accessToken)
        return responce
    },

    async logout() {
        const responce = await axiosClassic.post<Boolean>("/auth/logout")
        
        if (responce) removeAccessToken()
        return responce
    }
    
}