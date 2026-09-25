import { FormJson } from '@/components/form-builder/_component/aside/_component/json/FormJson';
import { FormPreview } from '@/components/form-builder/_component/aside/_component/preview/FormPreview';
import '@/components/form-builder/_component/aside/FormBuilderAside.css';
import type { Field } from '@/components/form-builder/_component/field-builder/types';
import { Tabs } from '@/components/ui/tabs/Tabs';

type FormBuilderAsideProps = {
  fields: Field[];
  onImport: (fields: Field[]) => void;
};

export function FormBuilderAside({ fields, onImport }: FormBuilderAsideProps) {
  return (
    <section className="builder-aside">
      <Tabs
        label="Form output"
        tabs={[
          { id: 'preview', label: 'Preview', content: <FormPreview fields={fields} /> },
          {
            id: 'json',
            label: 'JSON',
            content: <FormJson fields={fields} onImport={onImport} />,
          },
        ]}
      />
    </section>
  );
}
