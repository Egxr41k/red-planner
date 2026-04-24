import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import cn from "clsx"



type TypeBotton = ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({children, className, ...rest}: PropsWithChildren<TypeBotton>) => {
    return <button className={cn(
				'linear rounded-lg bg-transparent border border-primary py-2 px-7 text-base font-medium text-white transition hover:bg-primary active:bg-brand-700',
				className
			)} {...rest}>
    {children}
</button>
}