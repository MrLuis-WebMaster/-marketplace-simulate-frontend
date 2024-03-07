import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
    const baseStyles = 'w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-opacity-60 disabled:cursor-not-allowed';
    const primaryStyles = 'hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-purple-500';
    const secondaryStyles = 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300';

    const determineStyles = () => {
        if (variant === 'primary') {
            return `${baseStyles} ${primaryStyles}`;
        } else if (variant === 'secondary') {
            return `${baseStyles} ${secondaryStyles}`;
        }
        return baseStyles;
    };

    return (
        <button className={determineStyles()} {...props}>
            {children}
        </button>
    );
};

export default Button;
