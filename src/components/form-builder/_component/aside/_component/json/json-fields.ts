import type { Field, NumberField } from '@/components/form-builder/_component/field-builder/types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseField(value: unknown, ids: Set<string>): Field | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, type, label, required } = value;

  if (typeof label !== 'string' || typeof required !== 'boolean') {
    return null;
  }

  if (type !== 'text' && type !== 'number' && type !== 'group') {
    return null;
  }

  const fieldId =
    typeof id === 'string' && id.trim() !== '' && !ids.has(id) ? id : crypto.randomUUID();

  ids.add(fieldId);

  if (type === 'text') {
    return { id: fieldId, type, label, required };
  }

  if (type === 'number') {
    const field: NumberField = { id: fieldId, type, label, required };

    if (value.min !== undefined) {
      if (typeof value.min !== 'number' || !Number.isFinite(value.min)) {
        return null;
      }

      field.min = value.min;
    }

    if (value.max !== undefined) {
      if (typeof value.max !== 'number' || !Number.isFinite(value.max)) {
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

  return { id: fieldId, type, label, required, fields };
}

function finiteNumber(value: number | undefined): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function exportField(field: Field, problems: string[]): Field {
  if (field.type === 'text') {
    return { id: field.id, type: field.type, label: field.label, required: field.required };
  }

  if (field.type === 'number') {
    const next: NumberField = {
      id: field.id,
      type: field.type,
      label: field.label,
      required: field.required,
    };
    const min = finiteNumber(field.min);
    const max = finiteNumber(field.max);

    if (min !== undefined && max !== undefined && min > max) {
      problems.push('Min is greater than max, so those values were left out of the export.');
      return next;
    }

    if (min !== undefined) {
      next.min = min;
    }

    if (max !== undefined) {
      next.max = max;
    }

    return next;
  }

  return {
    id: field.id,
    type: field.type,
    label: field.label,
    required: field.required,
    fields: field.fields.map((child) => exportField(child, problems)),
  };
}

export function exportConfig(fields: Field[]): { json: string; problem: string } {
  const problems: string[] = [];
  const json = JSON.stringify(
    { fields: fields.map((field) => exportField(field, problems)) },
    null,
    2,
  );

  return { json, problem: problems[0] ?? '' };
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
