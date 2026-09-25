import type { Field } from '@/components/form-builder/_component/field-builder/types';
import '@/components/form-builder/_component/aside/_component/json/FormJson.css';

type FormJsonProps = {
  fields: Field[];
};

export function FormJson({ fields }: FormJsonProps) {
  return <pre className="form-json">{JSON.stringify({ fields }, null, 2)}</pre>;
}
