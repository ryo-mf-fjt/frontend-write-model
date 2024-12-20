import { Branded } from "../@shared/branded";
import { ColorInternal } from "./color";
import { getSettingApi, putSettingApi } from "../@backend-mock/main";

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

let getSettingApiState:
  | { status: "pending"; promise: Promise<unknown> }
  | { status: "fulfilled"; data: SettingInternal }
  | { status: "rejected"; error: unknown }
  | undefined = undefined;
export const useSetting = (): { data: SettingInternal } => {
  if (getSettingApiState == null) {
    const promise = getSettingApi()
      .then((data) => {
        getSettingApiState = {
          status: "fulfilled",
          data: SettingInternal(data),
        };
      })
      .catch((error) => {
        getSettingApiState = { status: "rejected", error };
      });
    getSettingApiState = { status: "pending", promise };
  }
  switch (getSettingApiState.status) {
    case "pending":
      throw getSettingApiState.promise;
    case "fulfilled":
      return { data: getSettingApiState.data };
    case "rejected":
      throw getSettingApiState.error;
  }
};

export type PutSettingData = {
  name: string;
  color?: string;
};

let putSettingApiState:
  | { status: "pending"; promise: Promise<unknown> }
  | { status: "fulfilled" }
  | { status: "rejected"; error: unknown }
  | undefined = undefined;
export const usePutSetting = (data: PutSettingData): void => {
  if (putSettingApiState == null) {
    const promise = putSettingApi(data)
      .then((data) => {
        putSettingApiState = { status: "fulfilled" };
      })
      .catch((error) => {
        putSettingApiState = { status: "rejected", error };
      });
    putSettingApiState = { status: "pending", promise };
  }
  switch (putSettingApiState.status) {
    case "pending":
      throw putSettingApiState.promise;
    case "fulfilled":
      return;
    case "rejected":
      throw putSettingApiState.error;
  }
};
