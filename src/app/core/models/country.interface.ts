import { Currency } from "./country-currency.interface";
import { CountryFlags } from "./country-flags.interface";
import { CountryMaps } from "./country-maps.interface";
import { CountryName } from "./country-name.interface";

export interface Country {
    cca3: string;
    name: CountryName;
    flags: CountryFlags;
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, Currency>;
    languages?: Record<string, string>;
    borders?: string[];
    area?: number;
    continents?: string[];
    timezones?: string[];
    maps?: CountryMaps;
}