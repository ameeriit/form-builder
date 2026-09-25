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
  const [isSuccess, setIsSuccess] = useState(false);
  const errors = useMemo(() => validateFields(fields, values, touched), [fields, values, touched]);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((current) => ({ ...current, [id]: value }));
    setIsSuccess(false);
  }, []);

  const handleBlur = useCallback((id: string) => {
    setTouched((current) => ({ ...current, [id]: true }));
  }, []);

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      const nextTouched: PreviewTouched = {};

      function mark(items: Field[]) {
        for (const field of items) {
          nextTouched[field.id] = true;

          if (field.type === 'group') {
            mark(field.fields);
          }
        }
      }

      mark(fields);
      setTouched(nextTouched);

      const currentErrors = validateFields(fields, values, nextTouched);
      setIsSuccess(Object.keys(currentErrors).length === 0);
    },
    [fields, values],
  );

  return { values, errors, isSuccess, handleChange, handleBlur, handleSubmit };
}
