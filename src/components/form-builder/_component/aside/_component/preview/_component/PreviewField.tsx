import type { PreviewValues } from '@/components/form-builder/_component/aside/_component/preview/preview-fields';
import type { Field } from '@/components/form-builder/_component/field-builder/types';

type PreviewFieldProps = {
  field: Field;
  values: PreviewValues;
  errors: PreviewValues;
  onChange: (id: string, value: string) => void;
};

export function PreviewField({ field, values, errors, onChange }: PreviewFieldProps) {
  const label = field.label.trim() === '' ? 'Untitled' : field.label;
  const error = errors[field.id];

  if (field.type === 'group') {
    return (
      <fieldset className="preview-field preview-field--group">
        <legend>
          {label}
          {field.required ? <span aria-hidden="true"> *</span> : null}
        </legend>
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
        {field.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={field.id}
        type="text"
        inputMode={field.type === 'number' ? 'decimal' : 'text'}
        value={values[field.id] ?? ''}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${field.id}-error` : undefined}
        onChange={(event) => onChange(field.id, event.target.value)}
      />
      {error ? (
        <p id={`${field.id}-error`} className="preview-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
