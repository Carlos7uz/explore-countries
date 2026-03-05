import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BorderCountry } from '../../core/models/country-borders.interface';
import { Currency } from '../../core/models/country-currency.interface';
import { Country } from '../../core/models/country.interface';
import { CountriesService } from '../../core/services/countries.service';

@Component({
  selector: 'app-country-detail',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private countriesService = inject(CountriesService);

  country: WritableSignal<Country | null> = signal(null);
  borderCountries: WritableSignal<BorderCountry[]> = signal([]);

  isLoading: WritableSignal<boolean> = signal(true);
  errorMessage: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const countryCode = params.get('id');

      if (countryCode) {
        this.loadCountryData(countryCode);
      }
    });
  }

  loadCountryData(code: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.countriesService.getCountryByCode(code).subscribe({
      next: (response) => {
        const countryData = response[0];
        this.country.set(countryData);

        if (countryData.borders && countryData.borders.length > 0) {
          this.countriesService.getBordersByCodes(countryData.borders).subscribe({
            next: (borders) => {
              this.borderCountries.set(borders);
              this.isLoading.set(false);
            },
            error: () => {
              this.borderCountries.set([]);
              this.isLoading.set(false);
            }
          });
        } else {
          this.borderCountries.set([]);
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        console.error('ERRO DETALHADO DA API:', err);

        this.errorMessage.set('Não foi possível carregar os detalhes deste país.');
        this.isLoading.set(false);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  getLanguages(languages?: Record<string, string>): string[] {
    return languages ? Object.values(languages) : [];
  }

  getCurrencies(currencies?: Record<string, Currency>): string[] {
    return currencies ? Object.values(currencies).map(c => `${c.name} (${c.symbol})`) : [];
  }

}
