import { memo } from 'react';
import type { PreviewValues } from '@/components/form-builder/_component/aside/_component/preview/preview-fields';
import type { Field } from '@/components/form-builder/_component/field-builder/types';

type PreviewFieldProps = {
  field: Field;
  values: PreviewValues;
  errors: PreviewValues;
  onChange: (id: string, value: string) => void;
  onBlur: (id: string) => void;
};

function previewFieldPropsAreEqual(previous: PreviewFieldProps, next: PreviewFieldProps) {
  if (
    previous.field !== next.field ||
    previous.onChange !== next.onChange ||
    previous.onBlur !== next.onBlur
  ) {
    return false;
  }

  if (previous.field.type === 'group') {
    return previous.values === next.values && previous.errors === next.errors;
  }

  return (
    previous.values[previous.field.id] === next.values[next.field.id] &&
    previous.errors[previous.field.id] === next.errors[next.field.id]
  );
}

export const PreviewField = memo(function PreviewField({
  field,
  values,
  errors,
  onChange,
  onBlur,
}: PreviewFieldProps) {
  const label = field.label.trim() === '' ? 'Untitled' : field.label;
  const error = errors[field.id];

  if (field.type === 'group') {
    return (
      <fieldset
        className="preview-field preview-field--group"
        aria-describedby={error ? `${field.id}-error` : undefined}
      >
        <legend>
          {label}
          {field.required ? (
            <span className="preview-field__required" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </legend>
        {error ? (
          <p id={`${field.id}-error`} className="preview-field__error">
            {error}
          </p>
        ) : null}
        <div className="preview-field__children">
          {field.fields.length === 0 ? (
            <p className="preview-field__empty">No fields in this group.</p>
          ) : null}
          {field.fields.map((child) => (
            <PreviewField
              key={child.id}
              field={child}
              values={values}
              errors={errors}
              onChange={onChange}
              onBlur={onBlur}
            />
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="preview-field">
      <label htmlFor={field.id}>
        {label}
        {field.required ? (
          <span className="preview-field__required" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      <input
        id={field.id}
        type="text"
        value={values[field.id] ?? ''}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${field.id}-error` : undefined}
        onChange={(event) => onChange(field.id, event.target.value)}
        onBlur={() => onBlur(field.id)}
      />
      {error ? (
        <p id={`${field.id}-error`} className="preview-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}, previewFieldPropsAreEqual);
