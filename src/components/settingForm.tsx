import { useEffect, useState } from "react";
import { failure, isFailure, Result, success } from "../@shared/result";
import { PutSettingData, SettingInternal, useSetting } from "../domain/setting";
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
import { putSettingApi } from "../@backend-mock/main";

type SettingFormData = {
  name: NameInputData;
  color: ColorInputData;
};

const SettingFormData = (setting: SettingInternal): SettingFormData => {
  return {
    name: NameInputData(setting.name),
    color: ColorInputData(setting.color),
  };
};

const externalizeSettingFormData = (
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

type _SettingFormProps = {
  setting: SettingInternal;
  onSubmit: (settingFormData: SettingFormData) => Promise<void>;
};

const _SettingForm = ({ setting, onSubmit }: _SettingFormProps) => {
  const [settingFormData, setSettingFormData] = useState<SettingFormData>(
    SettingFormData(setting)
  );

  const onChangeName = (name: NameInputData) => {
    setSettingFormData((_settingFormData) => ({ ...settingFormData, name }));
  };
  const onChangeColor = (color: ColorInputData) => {
    setSettingFormData((_settingFormData) => ({ ...settingFormData, color }));
  };

  return (
    <>
      <NameField value={settingFormData.name} onChange={onChangeName} />
      <ColorField value={settingFormData.color} onChange={onChangeColor} />
      <button
        onClick={() => {
          onSubmit(settingFormData);
        }}
      >
        送信
      </button>
    </>
  );
};

export type SettingFormProps = Omit<_SettingFormProps, "setting" | "onSubmit">;

export const SettingForm = (props: SettingFormProps) => {
  const { data: setting } = useSetting();

  const onSubmit = async (settingFormData: SettingFormData) => {
    const result = externalizeSettingFormData(settingFormData);
    if (isFailure(result)) {
      alert(result.error);
      return;
    }
    await putSettingApi(result.value);
  };

  return <_SettingForm setting={setting} onSubmit={onSubmit} {...props} />;
};
