import { FormBuilderAside } from '@/components/form-builder/_component/aside/FormBuilderAside';
import { FieldBuilder } from '@/components/form-builder/_component/field-builder/FieldBuilder';
import { FieldBuilderProvider } from '@/components/form-builder/_component/field-builder/FieldBuilderProvider';
import { FormBuilderHeader } from '@/components/form-builder/_component/header/FormBuilderHeader';
import '@/components/form-builder/ConfigurableFormBuilder.css';
import { Container } from '@/components/ui/Container';

export function ConfigurableFormBuilder() {
  return (
    <main>
      <Container>
        <FieldBuilderProvider>
          <div className="form-builder">
            <FormBuilderHeader />
            <div className="form-builder__layout">
              <FieldBuilder />
              <FormBuilderAside />
            </div>
          </div>
        </FieldBuilderProvider>
      </Container>
    </main>
  );
}

export default ConfigurableFormBuilder;
