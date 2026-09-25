import { type SyntheticEvent, useCallback, useMemo, useState } from 'react';
import {
  type PreviewTouched,
  type PreviewValues,
  validateFields,
} from '@/components/form-builder/_component/aside/_component/preview/preview-fields';
import type { Field } from '@/components/form-builder/_component/field-builder/types';

export function usePreviewForm(fields: Field[]) {
  const [values, setValues] = useState<PreviewValues>({});
  const [touched, setTouched] = useState<PreviewTouched>({});
  const errors = useMemo(() => validateFields(fields, values, touched), [fields, values, touched]);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((current) => ({ ...current, [id]: value }));
  }, []);

  const handleBlur = useCallback((id: string) => {
    setTouched((current) => ({ ...current, [id]: true }));
  }, []);

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      setTouched((current) => {
        const next = { ...current };

        function mark(items: Field[]) {
          for (const field of items) {
            next[field.id] = true;

            if (field.type === 'group') {
              mark(field.fields);
            }
          }
        }

        mark(fields);
        return next;
      });
    },
    [fields],
  );

  return { values, errors, handleChange, handleBlur, handleSubmit };
}
