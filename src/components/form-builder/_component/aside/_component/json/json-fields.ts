import type { Field, NumberField } from '@/components/form-builder/_component/field-builder/types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseField(value: unknown, ids: Set<string>): Field | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, type, label, required } = value;

  if (typeof id !== 'string' || id === '' || ids.has(id)) {
    return null;
  }

  if (typeof label !== 'string' || typeof required !== 'boolean') {
    return null;
  }

  if (type !== 'text' && type !== 'number' && type !== 'group') {
    return null;
  }

  ids.add(id);

  if (type === 'text') {
    return { id, type, label, required };
  }

  if (type === 'number') {
    const field: NumberField = { id, type, label, required };

    if (value.min !== undefined) {
      if (typeof value.min !== 'number') {
        return null;
      }

      field.min = value.min;
    }

    if (value.max !== undefined) {
      if (typeof value.max !== 'number') {
        return null;
      }

      field.max = value.max;
    }

    return field;
  }

  if (!Array.isArray(value.fields)) {
    return null;
  }

  const fields: Field[] = [];

  for (const child of value.fields) {
    const parsed = parseField(child, ids);

    if (!parsed) {
      return null;
    }

    fields.push(parsed);
  }

  return { id, type, label, required, fields };
}

export function parseFields(text: string): { fields: Field[] } | { error: string } {
  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    return { error: 'Enter valid JSON.' };
  }

  const list = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data.fields)
      ? data.fields
      : null;

  if (!list) {
    return { error: 'JSON must be a list of fields.' };
  }

  const fields: Field[] = [];
  const ids = new Set<string>();

  for (const item of list) {
    const field = parseField(item, ids);

    if (!field) {
      return { error: 'JSON must be a list of fields.' };
    }

    fields.push(field);
  }

  return { fields };
}
