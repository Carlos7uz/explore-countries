import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CountriesService } from '../../core/services/countries.service';
import { Country } from '../../core/models/country.interface';
import { Currency } from '../../core/models/country-currency.interface';

@Component({
  selector: 'app-country-detail',
  imports: [
    CommonModule, 
    RouterModule,
    MatButtonModule,
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

  country = signal<Country | null >(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id) {
        this.loadCountry(id);
      }
    });
  }

  loadCountry(code: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.countriesService.getCountryByCode(code).subscribe({
      next: (data) => {
        this.country.set(data[0]); 
        this.isLoading.set(false);
      },
      error: (err) => {
        // ESSA LINHA É A CHAVE!
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
