import { failure, Result, success } from "../@shared/result";

export type NameInputData = {
  name?: string;
  error?: string;
};

export const NameInputData = (name?: string): NameInputData => {
  return { name };
};

export const externalizeNameInputData = (
  inputData: NameInputData
): Result<string | undefined, string> => {
  if (inputData.error) {
    return failure(inputData.error);
  }
  return success(inputData.name);
};

export type NameFieldProps = {};

export const NameField = () => {
  return <div>not implemented</div>;
};
