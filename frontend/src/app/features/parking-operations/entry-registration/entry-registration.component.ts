import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { VehicleService } from '../../vehicles/services/vehicle.service';
import { ParkingSessionService } from '../services/parking-session.service';
import { ParkingSpotService } from '../../parking-spots/services/parking-spot.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { Vehicle, ParkingSpot, VehicleType } from '../../../shared/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './entry-registration.component.html'
})
export class EntryRegistrationComponent {
  searchPlate = '';
  vehicle: Vehicle | null = null;
  availableSpots: ParkingSpot[] = [];
  selectedSpotId = '';

  // UI States
  loading = false;
  error = '';

  constructor(
    private vehicleService: VehicleService,
    private sessionService: ParkingSessionService,
    private spotService: ParkingSpotService,
    private toastService: ToastService,
    private router: Router
  ) { }

  searchVehicle(): void {
    if (!this.searchPlate || this.searchPlate.length < 7) {
      this.toastService.warning('Digite uma placa válida');
      return;
    }

    this.loading = true;
    this.error = '';
    this.vehicleService.searchByLicensePlate(this.searchPlate.toUpperCase()).subscribe({
      next: (vehicle) => {
        this.vehicle = vehicle;
        this.loadAvailableSpots(vehicle.type);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.vehicle = null;
        // If 404, we could prompt to register. For now just show error.
        if (err.status === 404) {
          this.error = 'Veículo não encontrado. Por favor, cadastre o veículo primeiro.';
          // Option: Redirect to vehicle creation or open modal (not implemented yet for simplicity)
        } else {
          this.toastService.error('Erro ao buscar veículo');
        }
      }
    });
  }

  loadAvailableSpots(type: VehicleType): void {
    this.spotService.getAvailableSpots(type).subscribe({
      next: (spots) => {
        this.availableSpots = spots;
        if (spots.length === 0) {
          this.toastService.warning('Não há vagas disponíveis para este tipo de veículo.');
        }
      },
      error: () => this.toastService.error('Erro ao carregar vagas disponíveis')
    });
  }

  registerEntry(): void {
    if (!this.vehicle || !this.selectedSpotId) return;

    this.loading = true;
    this.sessionService.registerEntry(this.vehicle.id!, this.selectedSpotId).subscribe({
      next: () => {
        this.toastService.success('Entrada registrada com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toastService.error('Erro ao registrar entrada');
        this.loading = false;
      }
    });
  }
}
