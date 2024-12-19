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
