import { Branded } from "../@shared/branded";
import { ColorInternal } from "./color";

export type SettingInternal = Branded<
  { name: string; color?: ColorInternal },
  "SettingInternal"
>;

export type SettingInternalParams = {
  name: string;
  color?: string;
};

export const SettingInternal = ({
  name,
  color,
}: SettingInternalParams): SettingInternal =>
  Branded({ name, color: color != null ? ColorInternal(color) : undefined });

export type PutSettingBody = {
  name: string;
  color?: string;
};

export const usePutSettingBody = (body: PutSettingBody): void => {
  throw new Error("not implemented");
};
