import { IPomodoroSessionResponse, TypePomodoroRoundState, TypePomodoroState } from './../types/pomodoro.types';
import {  axiosWithAuth } from "@/api/interceptors"





class PomodoroService {
    private BASE_URL = '/user/timer'

    async getTodaySession() {
        const responce = await axiosWithAuth.get<IPomodoroSessionResponse>(`${this.BASE_URL}/today`)

        return responce
    }

    async createSession() {
        const res = await axiosWithAuth.post<IPomodoroSessionResponse>(this.BASE_URL)

        return res
    }

    async updateSession(id: string, data: TypePomodoroState) {
        const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)

        return res
    }

    async deleteSession(id: string) {
        const res = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)

        return res
    }

    async updateRound(id: string, data: TypePomodoroRoundState) {
        const res = await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data)

        return res
    }
}

export const pomodoroService = new PomodoroService()