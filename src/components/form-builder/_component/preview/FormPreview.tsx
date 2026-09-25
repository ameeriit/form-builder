import { type FormEvent, useState } from 'react';
import type { Field } from '@/components/form-builder/_component/field-builder/types';
import { PreviewField } from '@/components/form-builder/_component/preview/_component/PreviewField';
import '@/components/form-builder/_component/preview/FormPreview.css';
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
  const [submitted, setSubmitted] = useState(false);

  function handleChange(id: string, value: string) {
    const nextValues = { ...values, [id]: value };
    setValues(nextValues);

    if (errors[id]) {
      setErrors(validateFields(fields, nextValues));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFields(fields, values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
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
          <button type="submit">Submit</button>
          {submitted ? <p className="preview-panel__success">Form is valid.</p> : null}
        </form>
      )}
    </section>
  );
}
