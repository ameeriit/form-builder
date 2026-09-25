import { useCallback } from 'react';
import { AddFieldActions } from '@/components/form-builder/_component/field-builder/_component/AddFieldActions';
import { FieldCard } from '@/components/form-builder/_component/field-builder/_component/FieldCard';
import {
  useFieldActions,
  useFields,
} from '@/components/form-builder/_component/field-builder/FieldBuilderProvider';
import '@/components/form-builder/_component/field-builder/FieldBuilder.css';
import type { FieldType } from '@/components/form-builder/_component/field-builder/types';

export function FieldBuilder() {
  const fields = useFields();
  const { addField } = useFieldActions();
  const addRootField = useCallback((type: FieldType) => addField(null, type), [addField]);

  return (
    <section className="builder-panel" aria-labelledby="fields-heading">
      <h2 id="fields-heading">Fields</h2>
      <p className="builder-panel__count">{fields.length} root fields</p>
      <div className="builder-panel__fields">
        {fields.map((field, index) => (
          <FieldCard key={field.id} field={field} index={index} count={fields.length} />
        ))}
      </div>
      <AddFieldActions onAdd={addRootField} />
    </section>
  );
}
