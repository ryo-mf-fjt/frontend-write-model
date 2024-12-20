declare const __brand: unique symbol;

type Branded<T, B> = T & { __brand: B };

const Branded = <T, B>(value: T): Branded<T, B> => value as Branded<T, B>;

type Color = Branded<string, "Color">;

const Color = (color: string): Color => Branded(color);

type Setting = Branded<{ name: string; color: Color | null }, "Setting">;

const Setting = (setting: { name: string; color: Color | null }): Setting =>
  Branded(setting);

let setting: Setting = Setting({
  name: "name",
  color: Color("#ff0000"),
});

type SettingResponse = {
  name: string;
  color?: string;
};

export const getSettingApi = async (): Promise<SettingResponse> => {
  const { name, color } = setting;
  return { name, color: color ?? undefined };
};

type PutSettingBody = {
  name: string;
  color?: string;
};

export const putSettingApi = async ({
  name,
  color,
}: PutSettingBody): Promise<void> => {
  setting = Setting({ name, color: color != null ? Color(color) : null });
};
