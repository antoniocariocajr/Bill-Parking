import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ParkingSpotService } from '../services/parking-spot.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ParkingSpot, VehicleType, SpotStatus } from '../../../shared/models/models';

@Component({
    selector: 'app-parking-spot-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './parking-spot-list.component.html',
    styles: []
})
export class ParkingSpotListComponent implements OnInit {
    spots: ParkingSpot[] = [];
    filteredSpots: ParkingSpot[] = [];
    loading = false;
    showModal = false;
    isEditing = false;
    spotForm: FormGroup;
    searchTerm = '';

    // Expose enums to template
    VehicleType = VehicleType;
    SpotStatus = SpotStatus;

    vehicleTypes = Object.values(VehicleType);
    spotStatuses = Object.values(SpotStatus);

    constructor(
        private parkingSpotService: ParkingSpotService,
        private toastService: ToastService,
        private fb: FormBuilder
    ) {
        this.spotForm = this.fb.group({
            id: [''],
            code: ['', [Validators.required, Validators.pattern(/^[A-Z]\d{2}$/)]],
            type: [VehicleType.CAR, Validators.required],
            status: [SpotStatus.FREE, Validators.required],
            covered: [false]
        });
    }

    ngOnInit(): void {
        this.loadSpots();
    }

    loadSpots(): void {
        this.loading = true;
        this.parkingSpotService.getAll().subscribe({
            next: (spots) => {
                this.spots = spots;
                this.filteredSpots = spots;
                this.loading = false;
            },
            error: (error) => {
                this.toastService.error('Erro ao carregar vagas');
                this.loading = false;
            }
        });
    }

    filterSpots(): void {
        if (!this.searchTerm) {
            this.filteredSpots = this.spots;
            return;
        }

        const term = this.searchTerm.toLowerCase();
        this.filteredSpots = this.spots.filter(spot =>
            spot.code.toLowerCase().includes(term) ||
            spot.type.toLowerCase().includes(term) ||
            spot.status.toLowerCase().includes(term)
        );
    }

    openModal(spot?: ParkingSpot): void {
        this.isEditing = !!spot;
        if (spot) {
            this.spotForm.patchValue(spot);
        } else {
            this.spotForm.reset({
                type: VehicleType.CAR,
                status: SpotStatus.FREE,
                covered: false
            });
        }
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.spotForm.reset();
    }

    onSubmit(): void {
        if (this.spotForm.invalid) return;

        const spotData = this.spotForm.value;
        const request = this.isEditing
            ? this.parkingSpotService.update(spotData.id, spotData)
            : this.parkingSpotService.create(spotData);

        request.subscribe({
            next: () => {
                this.toastService.success(
                    this.isEditing ? 'Vaga atualizada com sucesso!' : 'Vaga criada com sucesso!'
                );
                this.closeModal();
                this.loadSpots();
            },
            error: (error) => {
                this.toastService.error('Erro ao salvar vaga');
            }
        });
    }

    deleteSpot(id: string): void {
        if (!confirm('Tem certeza que deseja excluir esta vaga?')) return;

        this.parkingSpotService.delete(id).subscribe({
            next: () => {
                this.toastService.success('Vaga excluída com sucesso!');
                this.loadSpots();
            },
            error: (error) => {
                this.toastService.error('Erro ao excluir vaga');
            }
        });
    }

    getStatusClass(status: SpotStatus): string {
        const classes: { [key in SpotStatus]: string } = {
            [SpotStatus.FREE]: 'bg-success-100 text-success-800',
            [SpotStatus.OCCUPIED]: 'bg-danger-100 text-danger-800',
            [SpotStatus.RESERVED]: 'bg-warning-100 text-warning-800',
            [SpotStatus.BLOCKED]: 'bg-gray-100 text-gray-800'
        };
        return classes[status];
    }

    getTypeLabel(type: VehicleType): string {
        const labels: { [key in VehicleType]: string } = {
            [VehicleType.CAR]: 'Carro',
            [VehicleType.MOTORCYCLE]: 'Moto',
            [VehicleType.TRUCK]: 'Caminhão'
        };
        return labels[type];
    }

    getStatusLabel(status: SpotStatus): string {
        const labels: { [key in SpotStatus]: string } = {
            [SpotStatus.FREE]: 'Livre',
            [SpotStatus.OCCUPIED]: 'Ocupada',
            [SpotStatus.RESERVED]: 'Reservada',
            [SpotStatus.BLOCKED]: 'Bloqueada'
        };
        return labels[status];
    }
}
