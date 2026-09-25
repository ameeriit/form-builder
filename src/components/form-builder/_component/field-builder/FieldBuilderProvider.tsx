import { createContext, type ReactNode, useContext } from 'react';
import type { Field } from '@/components/form-builder/_component/field-builder/types';
import { useFieldBuilder } from '@/components/form-builder/_component/field-builder/useFieldBuilder';

type FieldActions = ReturnType<typeof useFieldBuilder>['actions'];

const FieldActionsContext = createContext<FieldActions | null>(null);
const FieldsContext = createContext<Field[] | null>(null);

export function FieldBuilderProvider({ children }: { children: ReactNode }) {
  const { fields, actions } = useFieldBuilder([]);

  return (
    <FieldActionsContext.Provider value={actions}>
      <FieldsContext.Provider value={fields}>{children}</FieldsContext.Provider>
    </FieldActionsContext.Provider>
  );
}

export function useFieldActions() {
  const actions = useContext(FieldActionsContext);

  if (!actions) {
    throw new Error('useFieldActions must be used within FieldBuilderProvider');
  }

  return actions;
}

export function useFields() {
  const fields = useContext(FieldsContext);

  if (!fields) {
    throw new Error('useFields must be used within FieldBuilderProvider');
  }

  return fields;
}
