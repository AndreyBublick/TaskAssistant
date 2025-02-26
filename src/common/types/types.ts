import { ResultCodeStatus } from 'common/enums';

export type FieldError = { error: string; field: string };

export type ResponseType<D = {}> = {
  data: D;
  fieldsErrors: Array<FieldError>;
  messages: Array<string>;
  resultCode: ResultCodeStatus;
};
