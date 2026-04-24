import { TypesRoot } from "./root.types";

export interface IPomodoroRoundResponse extends TypesRoot {
    isCompeted?: boolean,
    totalSeconds: number
}

export interface IPomodoroSessionResponse extends TypesRoot {
    isCompeted?: boolean,
    round?: IPomodoroRoundResponse[]
}

export type TypePomodoroState = Partial<Omit<IPomodoroSessionResponse, 'id' | "createAt" | "updateAt">>
export type TypePomodoroRoundState = Partial<Omit<IPomodoroRoundResponse, 'id' | "createAt" | "updateAt">>