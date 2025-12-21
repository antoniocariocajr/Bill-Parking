import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { ClientService } from '../../clients/services/client.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { Vehicle, VehicleType, Client } from '../../../shared/models/models';

@Component({
    selector: 'app-vehicle-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[] = [];
    filteredVehicles: Vehicle[] = [];
    loading = false;
    showModal = false;
    isEditing = false;
    vehicleForm: FormGroup;
    searchTerm = '';

    // For selecting owner
    clients: Client[] = [];

    vehicleTypes = Object.values(VehicleType);
    VehicleType = VehicleType;

    constructor(
        private vehicleService: VehicleService,
        private clientService: ClientService,
        private toastService: ToastService,
        private fb: FormBuilder
    ) {
        this.vehicleForm = this.fb.group({
            id: [''],
            licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-?\d{1}[A-Z\d]{1}\d{2}$/)]],
            model: ['', Validators.required],
            color: ['', Validators.required],
            type: [VehicleType.CAR, Validators.required],
            ownerDisplay: [{ value: '', disabled: true }], // Just for display
            clientId: ['', Validators.required] // Used to send to backend if creating new vehicle logic assumes binding owner
        });
        // Note: Creating a vehicle usually requires associating with a client.
        // My backend CreateVehicleDTO probably requires ownerId (or clientId).
        // Let's create a select or autocomplete for owner.
    }

    ngOnInit(): void {
        this.loadVehicles();
        this.loadClients();
    }

    loadVehicles(): void {
        this.loading = true;
        this.vehicleService.getAll().subscribe({
            next: (vehicles) => {
                this.vehicles = vehicles;
                this.filteredVehicles = vehicles;
                this.loading = false;
            },
            error: () => {
                this.toastService.error('Erro ao carregar veículos');
                this.loading = false;
            }
        });
    }

    loadClients(): void {
        this.clientService.getAll().subscribe(clients => {
            this.clients = clients;
        });
    }

    filterVehicles(): void {
        if (!this.searchTerm) {
            this.filteredVehicles = this.vehicles;
            return;
        }
        const term = this.searchTerm.toLowerCase();
        this.filteredVehicles = this.vehicles.filter(v =>
            v.licensePlate.toLowerCase().includes(term) ||
            v.model.toLowerCase().includes(term)
        );
    }

    openModal(vehicle?: Vehicle): void {
        this.isEditing = !!vehicle;
        if (vehicle) {
            this.vehicleForm.patchValue({
                ...vehicle,
                // Assuming vehicle object has owner/clientId. 
                // Backend DTO might return 'owner' object or just name.
                // Assuming Vehicle model has 'ownerId' or nested owner.
                // Let's check models.ts content if possible, but I'll assume standard nesting or ID.
                clientId: (vehicle as any).owner?.id || (vehicle as any).ownerId
            });
        } else {
            this.vehicleForm.reset({ type: VehicleType.CAR });
        }
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
    }

    onSubmit(): void {
        if (this.vehicleForm.invalid) return;

        // Prepare DTO
        const formValue = this.vehicleForm.value;
        // Verify what backend expects. createVehicle(VehicleCreateDTO dto).
        // If I need to pass ownerId, I should ensure it's in the payload.

        const request = this.isEditing
            ? this.vehicleService.update(formValue.id, formValue)
            : this.vehicleService.create(formValue);

        request.subscribe({
            next: () => {
                this.toastService.success(this.isEditing ? 'Veículo atualizado!' : 'Veículo criado!');
                this.closeModal();
                this.loadVehicles();
            },
            error: () => this.toastService.error('Erro ao salvar veículo')
        });
    }

    deleteVehicle(id: string): void {
        if (!confirm('Excluir este veículo?')) return;
        this.vehicleService.delete(id).subscribe({
            next: () => {
                this.toastService.success('Veículo excluído!');
                this.loadVehicles();
            },
            error: () => this.toastService.error('Erro ao excluir veículo')
        });
    }
}
