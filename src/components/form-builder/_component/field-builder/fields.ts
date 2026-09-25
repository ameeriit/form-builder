import type {
  Field,
  FieldPatch,
  FieldType,
} from '@/components/form-builder/_component/field-builder/types';

export function createField(type: FieldType): Field {
  const id = crypto.randomUUID();

  if (type === 'group') {
    return { id, type, label: 'Untitled', required: false, fields: [] };
  }

  return { id, type, label: 'Untitled', required: false };
}

export function updateField(fields: Field[], id: string, patch: FieldPatch): Field[] {
  return fields.map((field) => {
    if (field.id === id) {
      return { ...field, ...patch };
    }

    if (field.type === 'group') {
      return { ...field, fields: updateField(field.fields, id, patch) };
    }

    return field;
  });
}

export function removeField(fields: Field[], id: string): Field[] {
  return fields
    .filter((field) => field.id !== id)
    .map((field) =>
      field.type === 'group' ? { ...field, fields: removeField(field.fields, id) } : field,
    );
}

export function moveField(fields: Field[], id: string, direction: -1 | 1): Field[] {
  const index = fields.findIndex((field) => field.id === id);

  if (index === -1) {
    return fields.map((field) =>
      field.type === 'group' ? { ...field, fields: moveField(field.fields, id, direction) } : field,
    );
  }

  const nextIndex = index + direction;

  if (nextIndex < 0 || nextIndex >= fields.length) {
    return fields;
  }

  const nextFields = [...fields];
  const [field] = nextFields.splice(index, 1);
  nextFields.splice(nextIndex, 0, field);
  return nextFields;
}

export function insertField(fields: Field[], parentId: string | null, field: Field): Field[] {
  if (parentId === null) {
    return [...fields, field];
  }

  return fields.map((item) => {
    if (item.type !== 'group') {
      return item;
    }

    if (item.id === parentId) {
      return { ...item, fields: [...item.fields, field] };
    }

    return { ...item, fields: insertField(item.fields, parentId, field) };
  });
}
