import { NativeName } from "./country-native-name.interface";

export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, NativeName>;
}