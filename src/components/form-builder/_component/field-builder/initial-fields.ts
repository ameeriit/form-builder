import type { Field } from '@/components/form-builder/_component/field-builder/types';

export const initialFields: Field[] = [
  {
    id: 'name',
    type: 'text',
    label: 'Full name',
    required: true,
  },
  {
    id: 'age',
    type: 'number',
    label: 'Age',
    required: false,
    min: 0,
    max: 120,
  },
  {
    id: 'address',
    type: 'group',
    label: 'Address',
    required: false,
    fields: [
      {
        id: 'city',
        type: 'text',
        label: 'City',
        required: true,
      },
    ],
  },
  {
    id: 'notes',
    type: 'group',
    label: 'Notes',
    required: false,
    fields: [],
  },
];
