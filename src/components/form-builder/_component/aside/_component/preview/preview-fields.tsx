import type { Field } from '@/components/form-builder/_component/field-builder/types';

export type PreviewValues = Record<string, string>;

export type PreviewErrors = Record<string, string>;

export function validateFields(fields: Field[], values: PreviewValues): PreviewErrors {
  const errors: PreviewErrors = {};

  function visit(items: Field[]) {
    for (const field of items) {
      if (field.type === 'group') {
        visit(field.fields);
        continue;
      }

      const value = values[field.id] ?? '';

      if (field.required && value.trim() === '') {
        errors[field.id] = 'This field is required';
        continue;
      }

      if (field.type !== 'number' || value.trim() === '') {
        continue;
      }

      const number = Number(value);

      if (Number.isNaN(number)) {
        errors[field.id] = 'Enter a number';
        continue;
      }

      if (field.min !== undefined && number < field.min) {
        errors[field.id] = `Must be at least ${field.min}`;
        continue;
      }

      if (field.max !== undefined && number > field.max) {
        errors[field.id] = `Must be at most ${field.max}`;
      }
    }
  }

  visit(fields);
  return errors;
}
