import { failure, Result, success } from "../@shared/result";
import { ColorInternal } from "../domain/color";

export type ColorInputData = {
  color?: ColorInternal;
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
  return success(inputData.color);
};

export type ColorFieldProps = {};

export const ColorField = () => {
  return <div>not implemented</div>;
};
