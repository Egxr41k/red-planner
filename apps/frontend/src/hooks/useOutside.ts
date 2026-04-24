import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"


type TypeOut = {
    ref: any
    isShow: boolean
    setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean): TypeOut => {
    const [isShow, setIsShow] = useState(initialIsVisible)
    const ref = useRef<HTMLElement>(null)

    const handlerClickOutside = (evt: any) => {
        if (ref.current && !ref.current.contains(evt.target)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handlerClickOutside, true)
        return () => {
            document.removeEventListener("click", handlerClickOutside, true)
        }
    })

  return { ref, isShow, setIsShow }
}