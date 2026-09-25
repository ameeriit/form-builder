import { AddFieldActions } from '@/components/form-builder/_component/field-builder/_component/AddFieldActions';
import { FieldCard } from '@/components/form-builder/_component/field-builder/_component/FieldCard';
import '@/components/form-builder/_component/field-builder/FieldBuilder.css';
import type { useFieldBuilder } from '@/components/form-builder/_component/field-builder/useFieldBuilder';

type FieldBuilderProps = ReturnType<typeof useFieldBuilder>;

export function FieldBuilder({
  fields,
  addField,
  editField,
  deleteField,
  reorderField,
}: FieldBuilderProps) {
  return (
    <section className="builder-panel" aria-labelledby="fields-heading">
      <h2 id="fields-heading">Fields</h2>
      <p className="builder-panel__count">{fields.length} root fields</p>
      <div className="builder-panel__fields">
        {fields.map((field, index) => (
          <FieldCard
            key={field.id}
            field={field}
            index={index}
            count={fields.length}
            onUpdate={editField}
            onRemove={deleteField}
            onMove={reorderField}
            onAdd={addField}
          />
        ))}
      </div>
      <AddFieldActions onAdd={(type) => addField(null, type)} />
    </section>
  );
}
