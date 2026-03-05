import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Country } from '../../core/models/country.interface';
import { CountriesService } from '../../core/services/countries.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private countriesService = inject(CountriesService);

  countries = signal<Country[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  searchQuery = signal<string>('');
  selectedRegion = signal<string>('');
  sortOption = signal<string>('name');

  filteredCountries = computed(() => {
    const all = this.countries();
    const query = this.searchQuery().toLowerCase().trim();
    const region = this.selectedRegion();
    const sort = this.sortOption();

    let filtered = all.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(query);
      const matchesRegion = region ? country.region === region : true;
      return matchesSearch && matchesRegion;
    });

    filtered.sort((a, b) => {
      if (sort === 'population') {
        return b.population - a.population;
      } else if (sort === 'area') {
        return (b.area || 0) - (a.area || 0);
      } else {
        return a.name.common.localeCompare(b.name.common);
      }
    });

    return filtered;
  });

  ngOnInit(): void {
    this.loadCountries();
  }

  private loadCountries(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.countriesService.getAllCountries().subscribe({
      next: (data) => {
        this.countries.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar países', err);
        this.errorMessage.set('Não foi possível carregar a lista de países. Tente novamente.');
        this.isLoading.set(false);
      }
    });
  }
}

