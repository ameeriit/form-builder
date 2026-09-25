import { useMemo } from 'react';
import { FormJson } from '@/components/form-builder/_component/aside/_component/json/FormJson';
import { FormPreview } from '@/components/form-builder/_component/aside/_component/preview/FormPreview';
import '@/components/form-builder/_component/aside/FormBuilderAside.css';
import {
  useFieldActions,
  useFields,
} from '@/components/form-builder/_component/field-builder/FieldBuilderProvider';
import { Tabs } from '@/components/ui';

export function FormBuilderAside() {
  const fields = useFields();
  const { replaceFields } = useFieldActions();
  const tabs = useMemo(
    () => [
      { id: 'preview', label: 'Preview', content: <FormPreview fields={fields} /> },
      { id: 'json', label: 'JSON', content: <FormJson fields={fields} onImport={replaceFields} /> },
    ],
    [fields, replaceFields],
  );

  return (
    <section className="builder-aside">
      <Tabs label="Form output" tabs={tabs} />
    </section>
  );
}
