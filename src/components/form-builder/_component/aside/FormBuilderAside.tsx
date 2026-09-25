import { useState } from 'react';
import { FormJson } from '@/components/form-builder/_component/aside/_component/json/FormJson';
import { FormPreview } from '@/components/form-builder/_component/aside/_component/preview/FormPreview';
import '@/components/form-builder/_component/aside/FormBuilderAside.css';
import type { Field } from '@/components/form-builder/_component/field-builder/types';

type AsideTab = 'preview' | 'json';

type FormBuilderAsideProps = {
  fields: Field[];
};

export function FormBuilderAside({ fields }: FormBuilderAsideProps) {
  const [tab, setTab] = useState<AsideTab>('preview');

  return (
    <section className="builder-aside">
      <div className="builder-aside__tabs" role="tablist" aria-label="Form output">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'preview'}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'json'}
          onClick={() => setTab('json')}
        >
          JSON
        </button>
      </div>
      <div role="tabpanel">
        {tab === 'preview' ? <FormPreview fields={fields} /> : <FormJson fields={fields} />}
      </div>
    </section>
  );
}
