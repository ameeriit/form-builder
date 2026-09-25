import { memo, useCallback } from 'react';
import { AddFieldActions } from '@/components/form-builder/_component/field-builder/_component/AddFieldActions';
import { useFieldActions } from '@/components/form-builder/_component/field-builder/FieldBuilderProvider';
import type {
  Field,
  FieldPatch,
  FieldType,
  NumberField,
} from '@/components/form-builder/_component/field-builder/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function NumberRange({
  field,
  onChange,
}: {
  field: NumberField;
  onChange: (patch: FieldPatch) => void;
}) {
  const maxIsTooSmall =
    field.min !== undefined && field.max !== undefined && field.max <= field.min;

  return (
    <div className="field-card__range">
      <Input
        variant="number"
        label="Min"
        inline
        value={field.min ?? ''}
        onChange={(event) =>
          onChange({
            min: event.target.value === '' ? undefined : Number(event.target.value),
          })
        }
      />
      <Input
        variant="number"
        label="Max"
        inline
        value={field.max ?? ''}
        error={maxIsTooSmall ? 'Max must be greater than min.' : undefined}
        onChange={(event) =>
          onChange({
            max: event.target.value === '' ? undefined : Number(event.target.value),
          })
        }
      />
    </div>
  );
}

type FieldCardProps = {
  field: Field;
  index: number;
  count: number;
  nested?: boolean;
};

export const FieldCard = memo(function FieldCard({
  field,
  index,
  count,
  nested = false,
}: FieldCardProps) {
  const { editField, deleteField, reorderField, addField } = useFieldActions();
  const addChild = useCallback((type: FieldType) => addField(field.id, type), [addField, field.id]);

  return (
    <article className={nested ? 'field-card field-card--nested' : 'field-card'}>
      <header className="field-card__header">
        <div className="field-card__main">
          {field.type === 'group' ? <span aria-hidden="true">▾</span> : null}
          <span className="field-card__type">{field.type}</span>
          <Input
            variant="text"
            value={field.label}
            aria-label="Label"
            onChange={(event) => editField(field.id, { label: event.target.value })}
          />
        </div>
        <div className="field-card__actions">
          <Button
            isIcon
            aria-label="Move up"
            disabled={index === 0}
            onClick={() => reorderField(field.id, -1)}
          >
            ↑
          </Button>
          <Button
            isIcon
            aria-label="Move down"
            disabled={index === count - 1}
            onClick={() => reorderField(field.id, 1)}
          >
            ↓
          </Button>
          <Button isIcon aria-label="Delete" onClick={() => deleteField(field.id)}>
            ×
          </Button>
        </div>
      </header>

      <Input
        variant="checkbox"
        label="Required"
        checked={field.required}
        onChange={(event) => editField(field.id, { required: event.target.checked })}
      />

      {field.type === 'number' ? (
        <NumberRange field={field} onChange={(patch) => editField(field.id, patch)} />
      ) : null}

      {field.type === 'group' ? (
        <div className="field-card__children">
          {field.fields.length === 0 ? <p className="field-card__empty">No children yet</p> : null}
          {field.fields.map((child, childIndex) => (
            <FieldCard
              key={child.id}
              field={child}
              index={childIndex}
              count={field.fields.length}
              nested
            />
          ))}
          <AddFieldActions onAdd={addChild} />
        </div>
      ) : null}
    </article>
  );
});
