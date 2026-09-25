import { type InputHTMLAttributes, type ReactNode, useId } from 'react';
import '@/components/ui/input/Input.css';

export type InputVariant = 'text' | 'number' | 'checkbox';
export type InputLayout = 'stack' | 'inline';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode;
  error?: string;
  variant?: InputVariant;
  layout?: InputLayout;
  inline?: boolean;
  isRequired?: boolean;
  containerClassName?: string;
};

export function Input({
  label,
  error,
  variant,
  type,
  layout,
  inline = false,
  isRequired = false,
  className = '',
  containerClassName = '',
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? (label || error ? generatedId : undefined);
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  const resolvedVariant: InputVariant =
    variant ?? (type === 'checkbox' ? 'checkbox' : type === 'number' ? 'number' : 'text');
  const inputType =
    type ??
    (resolvedVariant === 'checkbox'
      ? 'checkbox'
      : resolvedVariant === 'number'
        ? 'number'
        : 'text');

  const isMandatory = isRequired || props.required;
  const isInline = inline || layout === 'inline';

  const ariaDescribedBy =
    [props['aria-describedby'], errorId].filter(Boolean).join(' ') || undefined;
  const ariaInvalid = props['aria-invalid'] ?? (error ? true : undefined);

  if (resolvedVariant === 'checkbox') {
    const containerClasses = [
      'input-field',
      'input-field--checkbox',
      error ? 'input-field--error' : '',
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const controlClasses = ['input-control', 'input-control--checkbox', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <label htmlFor={inputId} className="input-field__checkbox-label">
          <input
            id={inputId}
            type="checkbox"
            className={controlClasses}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            {...props}
          />
          {label ? (
            <span className="input-field__label-text">
              {label}
              {isMandatory ? (
                <span className="input-field__required" aria-hidden="true">
                  {' '}
                  *
                </span>
              ) : null}
            </span>
          ) : null}
        </label>
        {error ? (
          <p id={errorId} className="input-field__error">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  const containerClasses = [
    'input-field',
    `input-field--${resolvedVariant}`,
    isInline ? 'input-field--inline' : '',
    error ? 'input-field--error' : '',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const controlClasses = ['input-control', `input-control--${resolvedVariant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label ? (
        <label htmlFor={inputId} className="input-field__label">
          {label}
          {isMandatory ? (
            <span className="input-field__required" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        id={inputId}
        type={inputType}
        className={controlClasses}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
      {error ? (
        <p id={errorId} className="input-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
