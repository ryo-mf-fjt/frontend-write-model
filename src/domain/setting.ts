import { useState } from "react";
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

export const useGetSetting = (): SettingInternal => {
  const [state, setState] = useState<
    | { status: "pending" }
    | { status: "fulfilled"; data: SettingInternal }
    | { status: "rejected"; error: unknown }
  >({ status: "pending" });
  const promise = getSettingApi()
    .then((data) => {
      setState({ status: "fulfilled", data: SettingInternal(data) });
    })
    .catch((error) => {
      setState({ status: "rejected", error });
    });
  switch (state.status) {
    case "pending":
      throw promise;
    case "fulfilled":
      return state.data;
    case "rejected":
      throw state.error;
  }
};

export type PutSettingData = {
  name: string;
  color?: string;
};

export const usePutSetting = (data: PutSettingData): void => {
  const [state, setState] = useState<
    | { status: "pending" }
    | { status: "fulfilled" }
    | { status: "rejected"; error: unknown }
  >({ status: "pending" });
  const promise = putSettingApi(data)
    .then(() => {
      setState({ status: "fulfilled" });
    })
    .catch((error) => {
      setState({ status: "rejected", error });
    });
  switch (state.status) {
    case "pending":
      throw promise;
    case "fulfilled":
      return;
    case "rejected":
      throw state.error;
  }
};
