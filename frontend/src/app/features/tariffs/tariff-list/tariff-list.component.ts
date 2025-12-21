import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { TariffService } from '../services/tariff.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { Tariff, VehicleType } from '../../../shared/models/models';

@Component({
    selector: 'app-tariff-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './tariff-list.component.html'
})
export class TariffListComponent implements OnInit {
    tariffs: Tariff[] = [];
    loading = false;
    showModal = false;
    isEditing = false;
    tariffForm: FormGroup;
    VehicleType = VehicleType;

    constructor(
        private tariffService: TariffService,
        private toastService: ToastService,
        private fb: FormBuilder
    ) {
        this.tariffForm = this.fb.group({
            id: [''],
            vehicleType: [VehicleType.CAR, Validators.required],
            hourlyRate: [0, [Validators.required, Validators.min(0)]],
            dailyRate: [0, [Validators.required, Validators.min(0)]],
            monthlyRate: [0, [Validators.required, Validators.min(0)]],
            validFrom: ['', Validators.required],
            validUntil: [''],
            active: [true]
        });
    }

    ngOnInit(): void {
        this.loadTariffs();
    }

    loadTariffs(): void {
        this.loading = true;
        this.tariffService.getAll().subscribe({
            next: (tariffs) => {
                this.tariffs = tariffs;
                this.loading = false;
            },
            error: () => {
                this.toastService.error('Erro ao carregar tarifas');
                this.loading = false;
            }
        });
    }

    openModal(tariff?: Tariff): void {
        this.isEditing = !!tariff;
        if (tariff) {
            this.tariffForm.patchValue(tariff);
        } else {
            this.tariffForm.reset({ vehicleType: VehicleType.CAR, active: true });
        }
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
    }

    onSubmit(): void {
        if (this.tariffForm.invalid) return;

        const request = this.isEditing
            ? this.tariffService.update(this.tariffForm.value.id, this.tariffForm.value)
            : this.tariffService.create(this.tariffForm.value);

        request.subscribe({
            next: () => {
                this.toastService.success(this.isEditing ? 'Tarifa atualizada!' : 'Tarifa criada!');
                this.closeModal();
                this.loadTariffs();
            },
            error: () => this.toastService.error('Erro ao salvar tarifa')
        });
    }

    deleteTariff(id: string): void {
        if (!confirm('Excluir esta tarifa?')) return;
        this.tariffService.delete(id).subscribe({
            next: () => {
                this.toastService.success('Tarifa excluída!');
                this.loadTariffs();
            },
            error: () => this.toastService.error('Erro ao excluir tarifa')
        });
    }

    toggleActive(tariff: Tariff): void {
        const request = tariff.active
            ? this.tariffService.deactivate(tariff.id!)
            : this.tariffService.activate(tariff.id!);

        request.subscribe({
            next: () => {
                this.toastService.success(`Tarifa ${tariff.active ? 'desativada' : 'ativada'}!`);
                this.loadTariffs();
            },
            error: () => this.toastService.error('Erro ao atualizar status')
        });
    }
}
