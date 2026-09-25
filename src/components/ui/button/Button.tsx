import type { ButtonHTMLAttributes, ReactNode } from 'react';
import '@/components/ui/button/Button.css';

export type ButtonVariant = 'default' | 'primary';
export type ButtonSize = 'default' | 'icon';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isIcon?: boolean;
};

export function Button({
  type = 'button',
  variant = 'default',
  size = 'default',
  isIcon = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isIconButton = isIcon || size === 'icon';
  const variantClass = variant !== 'default' ? `btn--${variant}` : '';
  const iconClass = isIconButton ? 'btn--icon' : '';
  const combinedClassName = ['btn', variantClass, iconClass, className].filter(Boolean).join(' ');

  return (
    <button type={type} className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
