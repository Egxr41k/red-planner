import type { CSSProperties, PropsWithChildren } from 'react'
import clsx from 'clsx';

interface IBage {
    className?: string
    variant?: string
    style?: CSSProperties
}

const baseStyles = 'rounded-lg w-max py-1 px-2 text-xs font-semibold text-sm text-white transition';

const variantStyles = {
    gray: 'bg-gray-500/20',
    high: 'bg-red-400/60',
    medium: 'bg-orange-400/70',
    low: 'bg-blue-400/70',
};

const Badge = ({children, className, variant = 'gray', style}: PropsWithChildren<IBage>) => {
    return <span style={style} className={clsx(baseStyles, variantStyles[variant as 'gray' | 'high' | 'medium' | 'low'], className)}>
      {children}
    </span>
}

export default Badge