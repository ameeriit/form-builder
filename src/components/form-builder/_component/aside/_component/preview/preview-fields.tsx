import type { Field } from '@/components/form-builder/_component/field-builder/types';

export type PreviewValues = Record<string, string>;

export type PreviewErrors = Record<string, string>;

export type PreviewTouched = Record<string, boolean>;

function hasEnteredValue(field: Field, values: PreviewValues): boolean {
  if (field.type === 'group') {
    return field.fields.some((child) => hasEnteredValue(child, values));
  }

  return (values[field.id] ?? '').trim() !== '';
}

function hasInput(field: Field): boolean {
  if (field.type !== 'group') {
    return true;
  }

  return field.fields.some(hasInput);
}

function isBranchTouched(field: Field, touched: PreviewTouched): boolean {
  if (touched[field.id]) {
    return true;
  }

  if (field.type !== 'group') {
    return false;
  }

  return field.fields.some((child) => isBranchTouched(child, touched));
}

export function validateFields(
  fields: Field[],
  values: PreviewValues,
  touched: PreviewTouched,
): PreviewErrors {
  const errors: PreviewErrors = {};

  function visit(items: Field[]) {
    for (const field of items) {
      if (field.type === 'group') {
        visit(field.fields);

        const showError = !hasInput(field) || isBranchTouched(field, touched);

        if (field.required && !hasEnteredValue(field, values) && showError) {
          errors[field.id] = 'This field is required';
        }

        continue;
      }

      const value = values[field.id] ?? '';
      const active = touched[field.id] || (field.type === 'number' && value.trim() !== '');

      if (!active) {
        continue;
      }

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
