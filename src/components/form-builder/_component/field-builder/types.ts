export type TextField = {
  id: string;
  type: 'text';
  label: string;
  required: boolean;
};

export type NumberField = {
  id: string;
  type: 'number';
  label: string;
  required: boolean;
  min?: number;
  max?: number;
};

export type GroupField = {
  id: string;
  type: 'group';
  label: string;
  required: boolean;
  fields: Field[];
};

export type Field = TextField | NumberField | GroupField;

export type FieldType = Field['type'];

export type FieldPatch = {
  label?: string;
  required?: boolean;
  min?: number;
  max?: number;
};
