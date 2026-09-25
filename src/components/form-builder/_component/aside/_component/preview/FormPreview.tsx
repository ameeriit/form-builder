import { PreviewField } from '@/components/form-builder/_component/aside/_component/preview/_component/PreviewField';
import { usePreviewForm } from '@/components/form-builder/_component/aside/_component/preview/usePreviewForm';
import type { Field } from '@/components/form-builder/_component/field-builder/types';
import '@/components/form-builder/_component/aside/_component/preview/FormPreview.css';
import { Button } from '@/components/ui/Button';

type FormPreviewProps = {
  fields: Field[];
};

export function FormPreview({ fields }: FormPreviewProps) {
  const { values, errors, isSuccess, handleChange, handleBlur, handleSubmit } =
    usePreviewForm(fields);

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
          <Button type="submit">Submit</Button>
          {isSuccess ? (
            <p className="preview-panel__success" role="status">
              Form submitted successfully!
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
