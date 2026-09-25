import type { Field } from '@/components/form-builder/_component/field-builder/types';
import { PreviewField } from '@/components/form-builder/_component/preview/_component/PreviewField';
import '@/components/form-builder/_component/preview/FormPreview.css';
import { type SyntheticEvent, useState } from 'react';
import {
  type PreviewErrors,
  type PreviewValues,
  validateFields,
} from '@/components/form-builder/_component/preview/preview-fields';

type FormPreviewProps = {
  fields: Field[];
};

export function FormPreview({ fields }: FormPreviewProps) {
  const [values, setValues] = useState<PreviewValues>({});
  const [errors, setErrors] = useState<PreviewErrors>({});

  function handleChange(id: string, value: string) {
    const nextValues = { ...values, [id]: value };
    setValues(nextValues);

    if (errors[id]) {
      setErrors(validateFields(fields, nextValues));
    }
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFields(fields, values);
    setErrors(nextErrors);
  }

  return (
    <section className="preview-panel" aria-labelledby="preview-heading">
      <h2 id="preview-heading">Preview</h2>
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
            />
          ))}
        </form>
      )}
    </section>
  );
}
