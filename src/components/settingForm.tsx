import { failure, isFailure, Result, success } from "../@shared/result";
import { PutSettingData, SettingInternal } from "../domain/setting";
import {
  ColorField,
  ColorInputData,
  externalizeColorInputData,
} from "./colorField";
import {
  externalizeNameInputData,
  NameField,
  NameInputData,
} from "./nameField";

export type SettingFormData = {
  name: NameInputData;
  color: ColorInputData;
};

export const SettingFormData = (setting: SettingInternal): SettingFormData => {
  return {
    name: NameInputData(setting.name),
    color: ColorInputData(setting.color),
  };
};

export const externalizeSettingFormData = (
  inputData: SettingFormData
): Result<PutSettingData, string> => {
  const nameResult = externalizeNameInputData(inputData.name);
  if (isFailure(nameResult)) {
    return failure(nameResult.error);
  }
  if (nameResult.value == null) {
    return failure("名称が入力されていません。");
  }
  const colorResult = externalizeColorInputData(inputData.color);
  if (isFailure(colorResult)) {
    return failure(colorResult.error);
  }
  return success({
    name: nameResult.value,
    color: colorResult.value,
  });
};

export type SettingFormProps = {};

export const SettingForm = () => {
  return (
    <>
      <NameField />
      <ColorField />
    </>
  );
};
