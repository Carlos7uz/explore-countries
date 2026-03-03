import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountriesService } from '../../core/services/countries.service';
import { Country } from '../../core/models/country.interface';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

  filteredCountries = computed(() => {
    const all = this.countries();
    const query = this.searchQuery().toLowerCase().trim();
    const region = this.selectedRegion();

    return all.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(query);
      const matchesRegion = region ? country.region === region : true;
      
      return matchesSearch && matchesRegion;
    });
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

