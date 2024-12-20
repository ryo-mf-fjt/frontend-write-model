import { failure, Result, success } from "../@shared/result";
import { ColorInternal } from "../domain/color";

export type ColorInputData = {
  color?: string;
  error?: string;
};

export const ColorInputData = (color?: ColorInternal): ColorInputData => {
  return { color };
};

export const externalizeColorInputData = (
  inputData: ColorInputData
): Result<ColorInternal | undefined, string> => {
  if (inputData.error) {
    return failure(inputData.error);
  }
  return success(
    inputData.color != null ? ColorInternal(inputData.color) : undefined
  );
};

export type ColorFieldProps = {
  value: ColorInputData;
  onChange: (value: ColorInputData) => void;
};

export const ColorField = ({ value, onChange }: ColorFieldProps) => {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({
      color: value,
      error:
        value != null && !value.match(/^#[0-9a-f]{6}$/)
          ? "カラーコードが不正です。"
          : undefined,
    });
  };

  return (
    <div>
      <p>{value.error}</p>
      <input value={value.color} onChange={onChangeValue} />
    </div>
  );
};
