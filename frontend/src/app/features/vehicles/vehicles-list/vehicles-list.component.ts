import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Lista de Vehicles</h1>
      <p class="text-gray-600">Componente em desenvolvimento...</p>
    </div>
  `
})
export class VehiclesListComponent {}
