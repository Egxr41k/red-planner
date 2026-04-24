'use client'
import { forwardRef, TextareaHTMLAttributes } from "react"
import cn from 'clsx'
 
type TypeTransparentField = TextareaHTMLAttributes<HTMLTextAreaElement>


export const TransparentField = forwardRef<
	HTMLTextAreaElement,
	TypeTransparentField
	>(({ className, ...rest }, ref) => {
	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
	return (
		<textarea
			className={cn(
				'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full resize-none overflow-hidden',
				className
			)}
			ref={ref}
			rows={3}
		    onInput={handleInput}
			{...rest}
		/>
	)
})

TransparentField.displayName = 'TransparentField'