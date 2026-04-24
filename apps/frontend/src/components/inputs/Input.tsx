import React, { forwardRef } from 'react';
import css from './input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    type?: string
    placeholder: string
    id: string
    isNumber?: boolean
    label: string,
    extra?: string,
    state?: 'error' | 'success',
    disabled?: boolean
}
export const Input = forwardRef<HTMLInputElement, InputProps>((
    { disabled, state, extra, label, name, type, placeholder, id, isNumber, ...rest },
    ref) => {
    return <div className={`${extra}`}>
        <label
            className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
            htmlFor={id}>
            {label}
            </label>
        <input
        ref={ref}
        className={`mt-2 flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary ${
						disabled === true
							? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
							: state === 'error'
								? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
								: state === 'success'
									? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
									: ''
					}`}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...rest}
        onKeyDown={event => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault()
						}
					}}
    />
    </div>
})
Input.displayName = "input"


