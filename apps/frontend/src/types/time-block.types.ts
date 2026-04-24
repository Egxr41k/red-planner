import { TypesRoot } from "./root.types"

export interface ITimeBlockResponse extends TypesRoot {
    name: string,
    color?: string,
    duration: number,
    order: number
}

export type TypeTimeBlockForm = Partial<Omit<ITimeBlockResponse, "createAt" | "updateAt">>