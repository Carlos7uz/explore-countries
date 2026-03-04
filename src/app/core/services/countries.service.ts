import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { map, Observable } from "rxjs";
import { Country } from "../models/country.interface";

@Injectable({
    providedIn: 'root'
})
export class CountriesService{
    private http = inject(HttpClient);

    private readonly API_URL = environment.apiUrl;

    getAllCountries(): Observable<Country[]> {
        const fields = 'cca3,name,flags,population,region,capital';
        return this.http.get<Country[]>(`${this.API_URL}/all?fields=${fields}`)
    }

    getCountryByCode(code: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.API_URL}/alpha/${code}`);
    }

    getBordersByCodes(codes: string[]): Observable<{ name: string, code: string }[]> {
    const codesString = codes.join(',');
    return this.http.get<any[]>(`${this.API_URL}/alpha?codes=${codesString}&fields=name,cca3`)
        .pipe(
        map(countries => countries.map(c => ({
            name: c.name.common,
            code: c.cca3
        })))
        );
    }
}