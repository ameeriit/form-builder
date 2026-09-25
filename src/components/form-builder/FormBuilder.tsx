import { FieldBuilder } from '@/components/form-builder/_component/field-builder/FieldBuilder';
import { FormBuilderHeader } from '@/components/form-builder/_component/header/FormBuilderHeader';
import '@/components/form-builder/FormBuilder.css';
import { Container } from '@/components/ui/Container';

export function FormBuilder() {
  return (
    <main>
      <Container>
        <div className="form-builder">
          <FormBuilderHeader />
          <FieldBuilder />
        </div>
      </Container>
    </main>
  );
}
