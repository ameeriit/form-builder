import { FormBuilderAside } from '@/components/form-builder/_component/aside/FormBuilderAside';
import { FieldBuilder } from '@/components/form-builder/_component/field-builder/FieldBuilder';
import { useFieldBuilder } from '@/components/form-builder/_component/field-builder/useFieldBuilder';
import { FormBuilderHeader } from '@/components/form-builder/_component/header/FormBuilderHeader';
import '@/components/form-builder/FormBuilder.css';
import { Container } from '@/components/ui/Container';

export function FormBuilder() {
  const fieldBuilder = useFieldBuilder([]);

  return (
    <main>
      <Container>
        <div className="form-builder">
          <FormBuilderHeader />
          <div className="form-builder__layout">
            <FieldBuilder {...fieldBuilder} />
            <FormBuilderAside fields={fieldBuilder.fields} />
          </div>
        </div>
      </Container>
    </main>
  );
}
