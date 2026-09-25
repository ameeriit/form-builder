import type { FieldType } from '@/components/form-builder/_component/field-builder/types';

const fieldTypes: FieldType[] = ['text', 'number', 'group'];

type AddFieldActionsProps = {
  onAdd: (type: FieldType) => void;
};

export function AddFieldActions({ onAdd }: AddFieldActionsProps) {
  return (
    <div className="field-list__add">
      {fieldTypes.map((type) => (
        <button key={type} type="button" onClick={() => onAdd(type)}>
          + {type}
        </button>
      ))}
    </div>
  );
}
