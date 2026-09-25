import { useCallback, useMemo, useState } from 'react';
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

  const addField = useCallback((parentId: string | null, type: FieldType) => {
    setFields((current) => insertField(current, parentId, createField(type)));
  }, []);

  const editField = useCallback((id: string, patch: FieldPatch) => {
    setFields((current) => updateField(current, id, patch));
  }, []);

  const deleteField = useCallback((id: string) => {
    setFields((current) => removeField(current, id));
  }, []);

  const reorderField = useCallback((id: string, direction: -1 | 1) => {
    setFields((current) => moveField(current, id, direction));
  }, []);

  const replaceFields = useCallback((nextFields: Field[]) => {
    setFields(nextFields);
  }, []);

  const actions = useMemo(
    () => ({ addField, editField, deleteField, reorderField, replaceFields }),
    [addField, editField, deleteField, reorderField, replaceFields],
  );

  return { fields, actions };
}
