import { PreviewField } from '@/components/form-builder/_component/aside/_component/preview/_component/PreviewField';
import type { Field } from '@/components/form-builder/_component/field-builder/types';
import '@/components/form-builder/_component/aside/_component/preview/FormPreview.css';
import { type SyntheticEvent, useEffect, useState } from 'react';
import {
  type PreviewErrors,
  type PreviewTouched,
  type PreviewValues,
  validateFields,
} from '@/components/form-builder/_component/aside/_component/preview/preview-fields';

type FormPreviewProps = {
  fields: Field[];
};

export function FormPreview({ fields }: FormPreviewProps) {
  const [values, setValues] = useState<PreviewValues>({});
  const [errors, setErrors] = useState<PreviewErrors>({});
  const [touched, setTouched] = useState<PreviewTouched>({});

  useEffect(() => {
    setErrors(validateFields(fields, values, touched));
  }, [fields, values, touched]);

  function handleChange(id: string, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  function handleBlur(id: string) {
    setTouched((current) => ({ ...current, [id]: true }));
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched((current) => {
      const next = { ...current };

      function mark(items: Field[]) {
        for (const field of items) {
          next[field.id] = true;

          if (field.type === 'group') {
            mark(field.fields);
          }
        }
      }

      mark(fields);
      return next;
    });
  }

  return (
    <div className="preview-panel">
      {fields.length === 0 ? (
        <p className="preview-panel__empty">Add a field to preview the form.</p>
      ) : (
        <form className="preview-panel__form" onSubmit={handleSubmit} noValidate>
          {fields.map((field) => (
            <PreviewField
              key={field.id}
              field={field}
              values={values}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
