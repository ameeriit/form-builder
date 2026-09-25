import type { FieldType } from '@/components/form-builder/_component/field-builder/types';
import { Button } from '@/components/ui';

const fieldTypes: FieldType[] = ['text', 'number', 'group'];

type AddFieldActionsProps = {
  onAdd: (type: FieldType) => void;
};

export function AddFieldActions({ onAdd }: AddFieldActionsProps) {
  return (
    <div className="field-list__add">
      {fieldTypes.map((type) => (
        <Button key={type} onClick={() => onAdd(type)}>
          + {type}
        </Button>
      ))}
    </div>
  );
}
