import { AddFieldActions } from '@/components/form-builder/_component/field-builder/_component/AddFieldActions';
import type {
  Field,
  FieldPatch,
  FieldType,
} from '@/components/form-builder/_component/field-builder/types';

type FieldCardProps = {
  field: Field;
  index: number;
  count: number;
  nested?: boolean;
  onUpdate: (id: string, patch: FieldPatch) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  onAdd: (parentId: string, type: FieldType) => void;
};

export function FieldCard({
  field,
  index,
  count,
  nested = false,
  onUpdate,
  onRemove,
  onMove,
  onAdd,
}: FieldCardProps) {
  return (
    <article className={nested ? 'field-card field-card--nested' : 'field-card'}>
      <header className="field-card__header">
        <div className="field-card__main">
          {field.type === 'group' ? <span aria-hidden="true">▾</span> : null}
          <span className="field-card__type">{field.type}</span>
          <input
            type="text"
            value={field.label}
            aria-label="Label"
            onChange={(event) => onUpdate(field.id, { label: event.target.value })}
          />
        </div>
        <div className="field-card__actions">
          <button
            type="button"
            aria-label="Move up"
            disabled={index === 0}
            onClick={() => onMove(field.id, -1)}
          >
            ↑
          </button>
          <button
            type="button"
            aria-label="Move down"
            disabled={index === count - 1}
            onClick={() => onMove(field.id, 1)}
          >
            ↓
          </button>
          <button type="button" aria-label="Delete" onClick={() => onRemove(field.id)}>
            ×
          </button>
        </div>
      </header>

      <label className="field-card__check">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(event) => onUpdate(field.id, { required: event.target.checked })}
        />
        Required
      </label>

      {field.type === 'number' ? (
        <div className="field-card__range">
          <label>
            Min
            <input
              type="number"
              value={field.min ?? ''}
              onChange={(event) =>
                onUpdate(field.id, {
                  min: event.target.value === '' ? undefined : Number(event.target.value),
                })
              }
            />
          </label>
          <label>
            Max
            <input
              type="number"
              value={field.max ?? ''}
              onChange={(event) =>
                onUpdate(field.id, {
                  max: event.target.value === '' ? undefined : Number(event.target.value),
                })
              }
            />
          </label>
        </div>
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
              onUpdate={onUpdate}
              onRemove={onRemove}
              onMove={onMove}
              onAdd={onAdd}
            />
          ))}
          <AddFieldActions onAdd={(type) => onAdd(field.id, type)} />
        </div>
      ) : null}
    </article>
  );
}
