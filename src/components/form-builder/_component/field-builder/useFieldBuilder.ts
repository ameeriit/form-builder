import { useState } from 'react';
import {
  createField,
  insertField,
  moveField,
  removeField,
  updateField,
} from '@/components/form-builder/_component/field-builder/fields';
import type {
  Field,
  FieldPatch,
  FieldType,
} from '@/components/form-builder/_component/field-builder/types';

export function useFieldBuilder(initialFields: Field[]) {
  const [fields, setFields] = useState(initialFields);

  function addField(parentId: string | null, type: FieldType) {
    setFields((current) => insertField(current, parentId, createField(type)));
  }

  function editField(id: string, patch: FieldPatch) {
    setFields((current) => updateField(current, id, patch));
  }

  function deleteField(id: string) {
    setFields((current) => removeField(current, id));
  }

  function reorderField(id: string, direction: -1 | 1) {
    setFields((current) => moveField(current, id, direction));
  }

  return {
    fields,
    addField,
    editField,
    deleteField,
    reorderField,
  };
}
