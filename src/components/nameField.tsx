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

export type NameFieldProps = {
  value: NameInputData;
  onChange: (value: NameInputData) => void;
};

export const NameField = ({ value, onChange }: NameFieldProps) => {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({
      name: value,
      error: value == null || value === "" ? "名称が空です。" : undefined,
    });
  };

  return (
    <div>
      <p>{value.error}</p>
      <input value={value.name} onChange={onChangeValue} />
    </div>
  );
};
