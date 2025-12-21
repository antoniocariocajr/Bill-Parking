import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operator-list',
  standalone: true,
  imports: [CommonModule],
  template: `
        <div class="p-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Operadores</h1>
            <p class="text-gray-600">Componente em desenvolvimento... (Apenas para Administradores)</p>
        </div>
    `
})
export class OperatorListComponent { }
