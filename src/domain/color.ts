import { Branded } from "../@shared/branded";

export type ColorInternal = Branded<string, "ColorInternal">;

export const ColorInternal = (color: string): ColorInternal => Branded(color);
